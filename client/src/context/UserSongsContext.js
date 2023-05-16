import { createContext, useEffect, useReducer, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

export const UserSongsContext = createContext();

export const UserSongsContextProvider = ({ children }) => {

    const repeatReducer = (state, action) => {
        if (action.type === 'set') {
            return action.payload;
        }
        switch (state) {
            case 0:
                return 1;
            case 1:
                return 2;
            case 2:
                return 0;
            default:
                return 0;
        }
    }

    const queueReducer = (state, action) => {
        switch (action.type) {
            case 'set':
                return action.payload
            case 'add':
                return [...state, action.payload]
            case 'play':
                return [action.payload, ...state]
            case 'clear':
                return []
            default:
                return state
        }
    }

    const [repeat, dispatchRepeat] = useReducer(repeatReducer, 0)
    const [random, setRandom] = useState(false)
    const [queue, dispatchQueue] = useReducer(queueReducer, []);
    const [nowPlaying, setNowPlaying] = useState(0)
    const [randomQueue, dispatchRandomQueue] = useReducer(queueReducer, []);
    const [randomNowPlaying, setRandomNowPlaying] = useState(0)
    const [likedSongs, setLikedSongs] = useState([])
    const [isLoaded, setIsloaded] = useState(false)
    const { user } = useAuthContext()
    
    useEffect(() => {
        if (user) {
            axios({
                method: 'get',
                url: process.env.REACT_APP_API_URL + `/api/users/songs`,
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
                .then(response => {
                    if (response.data) {
                        setRandom(response.data.userSongs.is_random)
                        dispatchRepeat({ type: 'set', payload: response.data.userSongs.repeat })
                        setLikedSongs(response.data.userSongs.liked_songs)
                        dispatchRandomQueue({ type: 'set', payload: response.data.userSongs.random_queue })
                        setRandomNowPlaying(response.data.userSongs.random_queue_num)
                        dispatchQueue({ type: 'set', payload: response.data.userSongs.queue })
                        setNowPlaying(response.data.userSongs.now_playing)
                        setIsloaded(true)
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [user])

    useEffect(() => {
        if (user) {
            axios({
                method: 'patch',
                url: process.env.REACT_APP_API_URL + `/api/users/setqueue`,
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                data: {
                    queue: queue
                }
            }).then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [queue])

    console.log(queue);

    return (
        <UserSongsContext.Provider value={{
            random, setRandom,
            repeat, dispatchRepeat,
            queue, dispatchQueue,
            likedSongs, setLikedSongs,
            nowPlaying, setNowPlaying,
            randomQueue, setRandomNowPlaying,
            randomNowPlaying, dispatchRandomQueue,
            isLoaded
        }}  >
            {children}
        </UserSongsContext.Provider>
    )

}