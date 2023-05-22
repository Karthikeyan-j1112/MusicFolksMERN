import { createContext, useEffect, useReducer, useState } from "react";
import { useUserSongsContext } from "../hooks/useUserSongsContext";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

export const AudioContext = createContext();

export const AudioContextProvider = ({ children }) => {

    const playingReducer = (state, action) => {
        switch (action) {
            case 'play':
                return true
            case 'pause':
                return false
            case 'toggle':
                return !state
            default:
                return state
        }
    }

    const [audioElement, setAudioElement] = useState(new Audio())
    const [isPlaying, toggleIsPlaying] = useReducer(playingReducer, false)
    const [currentDuration, setCurrentDuration] = useState('00:00')
    const [seekValue, setSeekValue] = useState(0)
    const [volume, setVolume] = useState(70)
    const [prevVolume, setPrevVolume] = useState(volume)
    const [nowPlayingDetails, setNowPlayingDetails] = useState(null)
    const [playOnLoad, setPlayOnLoad] = useState(false)
    const { random, repeat, queue, nowPlaying, setNowPlaying, randomQueue, randomNowPlaying, setRandomNowPlaying, isLoaded } = useUserSongsContext()
    const { user } = useAuthContext()

    audioElement.onended = () => {
        toggleIsPlaying('pause')
        const localQueue = random ? randomQueue : queue;
        const localNowPlaying = random ? randomNowPlaying : nowPlaying
        if (repeat === 0 || repeat === 1) {
            if (localQueue[localNowPlaying + 1]) {
                random ? setRandomNowPlaying(prev => prev + 1) : setNowPlaying(prev => prev + 1)
                loadTrack(localQueue[localNowPlaying + 1])
            }
            else if (repeat === 1) {
                random ? setRandomNowPlaying(0) : setNowPlaying(0)
                loadTrack(localQueue[0])
            }
        }
        else if (repeat === 2) {
            audioElement.currentTime = 0
            setSeekValue(0)
            setCurrentDuration('00:00')
        }
    }
    const loadTrack = async (_id) => {
        toggleIsPlaying('pause')
        setCurrentDuration('00:00')
        setSeekValue(0)
        try {
            const details = await axios({
                method: 'get',
                url: process.env.REACT_APP_API_URL + `/api/songs/getlink`,
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                data: {
                    _id
                }
            })
            setNowPlayingDetails(details.data)
            setAudioElement(new Audio(details.data.song_link))
            setPlayOnLoad(true)
            audioElement.load()
        } catch (error) {
            console.log(error);
        }
    }

    audioElement.onloadeddata = () => { playOnLoad && toggleIsPlaying('play') }

    useEffect(() => {
        audioElement.volume = volume / 100
    }, [volume])

    useEffect(() => {
        if (!isNaN((audioElement.currentTime / audioElement.duration) * 100)) {
            setSeekValue((audioElement.currentTime / audioElement.duration) * 100)
        }
    }, [currentDuration])

    useEffect(() => {
        if (audioElement.src !== null || audioElement.src !== '') {
            if (isPlaying) {
                audioElement.play()
                window.currentTimeInterval = setInterval(() => {
                    const totalSec = audioElement.currentTime
                    const seconds = Math.floor(totalSec % 60);
                    const minutes = Math.floor((totalSec / 60) % 60)
                    setCurrentDuration(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
                }, 1000)
            }
            else {
                audioElement.pause()
                clearInterval(window.currentTimeInterval)
            }
        }
    }, [isPlaying])

    useEffect(() => {
        (async () => {
            if (isLoaded) {
                const localQueue = random ? randomQueue : queue;
                const localNowPlaying = random ? randomNowPlaying : nowPlaying
                if (localQueue[localNowPlaying]) {
                    try {
                        const details = await axios({
                            method: 'get',
                            url: process.env.REACT_APP_API_URL + `/api/songs/getlink`,
                            headers: {
                                Authorization: `Bearer ${user.token}`
                            },
                            data: {
                                _id: localQueue[localNowPlaying]
                            }
                        })
                        setNowPlayingDetails(details.data)
                        setAudioElement(new Audio(details.data.song_link))
                        audioElement.load()
                    } catch (error) {
                        console.log(error);
                    }

                }
            }
        })()
    }, [isLoaded])

    return (
        <AudioContext.Provider value={{
            audioElement, setAudioElement,
            isPlaying, toggleIsPlaying,
            currentDuration,
            volume, setVolume,
            prevVolume, setPrevVolume,
            seekValue, setSeekValue,
            loadTrack,
            nowPlayingDetails
        }}
        >
            {children}
        </AudioContext.Provider>
    )
}