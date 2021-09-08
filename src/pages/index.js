import { useState } from 'react'
import Select from "react-select";
import styles from '../styles/Home.module.scss'
import Checkbox from "../components/Checkbox"
import { useRouter } from 'next/router'
import { getVideoID } from 'ytdl-core';

export default function Home() {
  const [video_id, setVideoId] = useState("")
  const [video_only, setVideoOnly] = useState(false);
  const [audio_only, setAudioOnly] = useState(false);
  const [quality, setQuality] = useState("720p")
  const [bitrate, setBitrate] = useState(128)
  const router = useRouter()

  const QUALITY_OPTIONS = [
    { value: "144p", label: '144p' },
    { value: "240p", label: '240p' },
    { value: "360p", label: '360p' },
    { value: "480p", label: '480p' },
    { value: "720p", label: '720p' },
    { value: "1080p", label: '1080p' },
  ]
  const BITRATE_OPTIONS = [
    { value: 96, label: "96"},
    { value: 128, label: 128}
  ]
  const customStyles = {
    container: (provided) => ({
      ...provided,
      cursor: "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
      cursor: "pointer",
      fontFamily: "Montserrat",
      fontSize: "15px",
      fontWeight: "400",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: state.isFocused ? "#E63946" : "#FCFCFC",
      color:  state.isFocused ? "#ffffff" : state.isSelected ? "#E63946" : null,
      fontFamily: "Montserrat",
      fontWeight: "400",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#FCFCFC"
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      flexDirection: "row",
      width: 200,
      backgroundColor: "#FCFCFC",
      boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.13)",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition};
    }
  }
  async function transferVideo() {
    const parsed_video_id = getVideoID(video_id).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
    let format = "mp4";
    if(audio_only) format = "mp3"
    window.open(`/api/videos/${parsed_video_id}?video_only=${video_only}&audio_only=${audio_only}&bitrate=${bitrate}&quality=${quality}&format=${format}`, "_blank")
  }
  return (
    <div className={styles.MainDiv}>
      <h1 className={styles.Title}>Down<span className={styles.RedTitle}>Tube</span></h1>
      <h2 className={styles.SubTitle}>Download videos in a flash</h2>
      <input className={styles.InputURL} placeholder="insert video url...." onChange={(e) => setVideoId(e.target.value)}></input>
      <div className={styles.OnlyOptionsDiv}>
        <div className={styles.OnlyAudioDiv}>
          <label className={styles.OnlyAudioLabel}>Audio Only</label>
          <Checkbox size={40} active={audio_only} onClick={()=>setAudioOnly(!audio_only)}></Checkbox>
        </div>
      </div>
      <div className={styles.QualityOptionsDiv}>
        <Select onChange={(option) => setQuality(option.value)} isDisabled={audio_only} isSearchable={false} placeholder="Video Quality" styles={customStyles} options={QUALITY_OPTIONS}></Select>
      </div>
      <div className={styles.BitrateOptionsDiv}>
        <Select onChange={(option) => setBitrate(option.value)} isDisabled={video_only} isSearchable={false} placeholder="Audio Bitrate" styles={customStyles} options={BITRATE_OPTIONS}></Select>
      </div>
      <button className={styles.DownloadButton} onClick={transferVideo}>
        Download Video
      </button>
    </div>
  )
}
