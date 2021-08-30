import { useState } from 'react'
import Select from "react-select";
import styles from '../styles/Home.module.scss'
import Checkbox from "../components/Checkbox"

export default function Home() {
  const [video_only, setVideoOnly] = useState(false);
  const [audio_only, setAudioOnly] = useState(false);

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
  return (
    <div className={styles.MainDiv}>
      <h1 className={styles.Title}>Down<span className={styles.RedTitle}>Tube</span></h1>
      <h2 className={styles.SubTitle}>Download videos in a flash</h2>
      <input className={styles.InputURL} placeholder="insert video url...."></input>
      <div className={styles.OnlyOptionsDiv}>
        <div className={styles.OnlyVideoDiv}>
          <label className={styles.OnlyVideoLabel}>Video Only</label>
          <Checkbox size={40} active={video_only} onClick={()=>setVideoOnly(!video_only)}></Checkbox>
        </div>
        <div className={styles.OnlyAudioDiv}>
          <label className={styles.OnlyAudioLabel}>Audio Only</label>
          <Checkbox size={40} active={audio_only} onClick={()=>setAudioOnly(!audio_only)}></Checkbox>
        </div>
      </div>
      <div className={styles.QualityOptionsDiv}>
        <Select isDisabled={audio_only} isSearchable={false} placeholder="Video Quality" styles={customStyles} options={QUALITY_OPTIONS}></Select>
      </div>
      <div className={styles.BitrateOptionsDiv}>
        <Select isDisabled={video_only} isSearchable={false} placeholder="Audio Bitrate" styles={customStyles} options={BITRATE_OPTIONS}></Select>
      </div>
      <button className={styles.DownloadButton}>
        Download Video
      </button>
    </div>
  )
}
