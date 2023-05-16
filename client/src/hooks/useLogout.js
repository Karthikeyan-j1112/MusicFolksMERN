import { useAuthContext } from "./useAuthContext"
import {useUserSongsContext} from './useUserSongsContext'
export const useLogout = () => {
    const { dispatchUser } = useAuthContext() 
    const { setRandom, dispatchRepeat,
        dispatchQueue, setLikedSongs,
        setNowPlaying } = useUserSongsContext()
    const logout = () => {
        localStorage.removeItem('user')
        dispatchUser({ type: 'LOGOUT' })
        setRandom(false)
        dispatchRepeat({type:"set",payload:0})
        dispatchQueue({type:"clear"})
        setNowPlaying(0)
        setLikedSongs([])
    }
    return { logout }
}