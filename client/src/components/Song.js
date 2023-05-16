import React, { useState } from 'react'
import styles from '../CSS Modules/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { MdPlaylistAdd } from 'react-icons/md'
import { useUserSongsContext } from '../hooks/useUserSongsContext'
import { useAudioContext } from '../hooks/useAudioContext'

export const Song = ({ song }) => {

    const [hoverIcon, setHoverIcon] = useState('hidden')
    const { dispatchQueue , setNowPlaying } = useUserSongsContext()
    const { loadTrack } = useAudioContext()

    const appendIcon = (e) => {
        setHoverIcon('visible')
    }

    const removeIcon = (e) => {
        setHoverIcon('hidden')
    }

    const playSong = () => {
        dispatchQueue({ type: "play", payload: song._id })
        loadTrack(song._id)
        setNowPlaying(0)
    }

    const addQueue = () => {
        dispatchQueue({ type: "add", payload: song })
    }

    return (
        <div className={styles.song} onMouseOver={appendIcon} onMouseOut={removeIcon}  >
            <img className={styles.song_img} src={song.song_image} alt={song.song_name} />
            <div className={styles.song_name} > {song.song_name} </div>
            <div className={styles.artist_name}> {song.artist} </div>
            <FontAwesomeIcon icon={faCirclePlay} visibility={hoverIcon} onClick={playSong} color='#1fdf64' className={styles.play_icon} />
            <MdPlaylistAdd visibility={hoverIcon} onClick={addQueue} className={styles.queue_icon} />
        </div>
    )
}
