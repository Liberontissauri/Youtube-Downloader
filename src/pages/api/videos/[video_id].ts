const ffmpeg = require('fluent-ffmpeg');
import { NextApiRequest, NextApiResponse } from "next";
const ytdl = require('ytdl-core');

function validateFormatVideo(format: string) {
    const OUTPUT_FORMATS = [
        "mp4",
        "avi",
        "flv",
        "webm"
    ]
    return OUTPUT_FORMATS.includes(format)
}
function validateFormatAudio(format: string) {
    const OUTPUT_FORMATS = [
        "mp3",
        "ogg",
        "wav",
    ]
    return OUTPUT_FORMATS.includes(format)
}

  
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const video_id: string  | string[]= req.query.video_id;
    if(typeof video_id != "string") return res.status(400).send({message: "video_id cannot be a list"})
    if(!video_id || !ytdl.validateID(video_id)) return res.status(404).send({message: "invalid id or the video does not exist"})

    let video_only: Boolean = false;
    let audio_only: Boolean = false;
    if (req.query.audio_only == "true") audio_only = true;
    if (req.query.video_only == "true") video_only = true;

    const quality: string | string[] = req.query.quality || "720p";
    if(typeof quality != "string") return res.status(400).send({message: "quality cannot be a list"})

    let audioBitrate: Number = 128;
    if(typeof req.query.bitrate == "string") audioBitrate = parseInt(req.query.bitrate)
    
    const format: string | string[] = req.query.format || "mp4";
    if(typeof format != "string") return res.status(400).send({message: "format cannot be a list"})

    const video_stream = ytdl(video_id, {
    filter: format => {
        if(video_only) return !format.hasAudio;
        if(audio_only) return !format.hasVideo && format.audioBitrate == audioBitrate;
        
        return format.hasVideo && format.hasAudio;
    }
    });

    if(validateFormatVideo(format) || validateFormatAudio(format)) {
        res.setHeader('Content-Disposition', `attachment; filename=${"content."}${format}`);
        if(format == "mp4") 
            return video_stream.pipe(res)
        
        return ffmpeg(video_stream)
        .format(format)
        .pipe(res);
        
    }
    res.send({message: "something's wrong with the chosen format, perhaps it's not supported?"})
    
}