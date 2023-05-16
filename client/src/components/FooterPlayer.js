import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAudioContext } from '../hooks/useAudioContext'
import styles from '../CSS Modules/footer.module.css'
import { Link } from 'react-router-dom'
import { useUserSongsContext } from '../hooks/useUserSongsContext'
import { VscHeart, VscHeartFilled } from 'react-icons/vsc'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackwardStep, faCirclePause, faCirclePlay, faForwardStep, faShuffle, faVolumeHigh, faVolumeLow, faVolumeOff, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'
import { TbRepeat, TbRepeatOnce } from 'react-icons/tb'
import { HiOutlineQueueList } from 'react-icons/hi2'

export const FooterPlayer = () => {
    const { user } = useAuthContext()
    const { random, setRandom,
        repeat, dispatchRepeat,
        queue,
        nowPlaying, setNowPlaying,
        randomQueue,
        randomNowPlaying, setRandomNowPlaying } = useUserSongsContext()

    const { audioElement, isPlaying,
        toggleIsPlaying, currentDuration,
        volume, setVolume,
        prevVolume, setPrevVolume,
        seekValue, setSeekValue,
        loadTrack, nowPlayingDetails } = useAudioContext()
    const getBackgroundSeekBar = () => {
        return {
            backgroundSize: `${(seekValue * 100) / 100}% 100%`,
        };
    }

    const getBackgroundVolume = () => {
        return {
            backgroundSize: `${(volume * 100) / 100}% 100%`,
        };
    }

    const getVolumeIcon = () => {
        switch (true) {
            case (volume === 0):
                return faVolumeXmark
            case (volume < 35):
                return faVolumeOff
            case (volume >= 35 && volume < 70):
                return faVolumeLow
            case (volume >= 70):
                return faVolumeHigh
            default:
                return faVolumeHigh
        }
    }
    const getRepeat = () => {
        switch (repeat) {
            case 0:
                return <TbRepeat className={styles.repeat} color='grey' size='20px' onClick={dispatchRepeat} />
            case 1:
                return <TbRepeat className={styles.repeat} size='20px' onClick={dispatchRepeat} />
            case 2:
                return <TbRepeatOnce className={styles.repeat} size='20px' onClick={dispatchRepeat} />
            default:
                return <TbRepeat className={styles.repeat} color='grey' size='20px' onClick={dispatchRepeat} />
        }
    }

    function nextTrack() {
        const localQueue = random ? randomQueue : queue
        const localNowPlaying = random ? randomNowPlaying : nowPlaying

        if (localQueue[localNowPlaying + 1]) {
            toggleIsPlaying('pause')
            random ? setRandomNowPlaying(prev => prev + 1) : setNowPlaying(prev => prev + 1)
            loadTrack(localQueue[localNowPlaying + 1])
            if (repeat === 2) {
                dispatchRepeat({ type: 'set', payload: 1 })
            }
        }
        else if (repeat !== 0) {
            toggleIsPlaying('pause')
            random ? setRandomNowPlaying(0) : setNowPlaying(0)
            loadTrack(localQueue[0])
            if (repeat === 2) {
                dispatchRepeat({ type: 'set', payload: 1 })
            }
        }
    }

    const prevTrack = () => {
        if (audioElement.currentTime <= 3) {
            const localQueue = random ? randomQueue : queue;
            const localNowPlaying = random ? randomNowPlaying : nowPlaying
            if (localNowPlaying !== 0) {
                toggleIsPlaying('pause')
                random ? setRandomNowPlaying(prev => prev - 1) : setNowPlaying(prev => prev - 1)
                loadTrack(localQueue[localNowPlaying - 1])
                if (repeat === 2) {
                    dispatchRepeat({ type: 'set', payload: 1 })
                }
            }
            else if (repeat !== 0) {
                toggleIsPlaying('pause')
                random ? setRandomNowPlaying(localQueue.length - 1) : setNowPlaying(localQueue.length - 1)
                loadTrack(localQueue[localQueue.length - 1])
                if (repeat === 2) {
                    dispatchRepeat({ type: 'set', payload: 1 })
                }
            }
        }
        else {
            audioElement.currentTime = 0
        }
    }

    if (!user) {
        return (
            <footer className={styles.footer_1} >
                <div className={styles.sign_up} >
                    <div className={styles.title}>Preview For MusicFolks web player</div>
                    <Link to='/users/signup'>
                        <div className={styles.content} >Sign up to get unlimited songs create Playlists, save a collections</div>
                    </Link>
                </div>
                <Link to='/users/signup'> <button className={styles.signup_btn}>Sign up</button> </Link>
            </footer>
        )
    }
    else {
        return (
            <footer className={styles.footer_2}>
                <div className={styles.track}>
                    {
                        (nowPlayingDetails) && (
                            <>
                                <img className={`${styles.image} ${isPlaying && styles.rotate}`} src={nowPlayingDetails.song_image} alt='song' />
                                <div className={styles.details}>
                                    <div className={styles.name}>{nowPlayingDetails.song_name}</div>
                                    <div className={styles.artist}>{nowPlayingDetails.artist}</div>
                                </div>
                                {
                                    nowPlayingDetails.liked ?
                                        <VscHeartFilled className={styles.liked} color='#1ed760' size='25px' /> :
                                        <VscHeart className={styles.liked} size='25px' />
                                }
                            </>
                        )
                    }
                </div>
                <div className={styles.main}>
                    <div className={styles.controls} >
                        <FontAwesomeIcon icon={faShuffle} color={random ? 'white' : 'grey'} className={styles.shuffle} onClick={() => setRandom(prev => !prev)} />
                        <FontAwesomeIcon icon={faBackwardStep} className={styles.skips} onClick={prevTrack} />
                        <FontAwesomeIcon
                            icon={isPlaying ? faCirclePause : faCirclePlay}
                            className={styles.playpause}
                            onClick={() => {
                                if (audioElement.src !== '') {
                                    toggleIsPlaying('toggle')
                                }
                            }}
                        />
                        <FontAwesomeIcon icon={faForwardStep} onClick={nextTrack} className={styles.skips} />
                        {getRepeat()}
                    </div>
                    <div className={styles.slidecontainer} >
                        <div className={styles.current_duration} >{currentDuration}</div>
                        <input
                            value={seekValue}
                            max='100'
                            onChange={(e) => {
                                setSeekValue(e.target.value)
                                if (isFinite(((e.target.value / 100) * audioElement.duration).toFixed(2))) {
                                    audioElement.currentTime = (((e.target.value / 100) * audioElement.duration).toFixed(2))
                                }
                            }}
                            style={getBackgroundSeekBar()}
                            type='range'
                            title=''
                            className={styles.slidebar}
                        />
                        <div className={styles.total_duration} >{nowPlayingDetails ? nowPlayingDetails.duration : '00:00'}</div>
                    </div>
                </div>
                <div className={styles.side} >
                    <HiOutlineQueueList className={styles.queue} size='20px' />
                    <div className={styles.volumeIContainer} >
                        <FontAwesomeIcon
                            onClick={() => {
                                if (volume !== 0) {
                                    setPrevVolume(volume)
                                    setVolume(0)
                                }
                                else {
                                    setVolume(prevVolume)
                                }
                            }}
                            icon={getVolumeIcon()}
                            className={styles.volumeicon}
                        />
                    </div>
                    <input
                        value={volume}
                        max='100'
                        min='0'
                        onChange={(e) => setVolume(e.target.value)}
                        style={getBackgroundVolume()}
                        type='range'
                        className={styles.volumebar}
                    />
                </div>
            </footer>
        )
    }
}
