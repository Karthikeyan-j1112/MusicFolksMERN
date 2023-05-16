import { useContext } from "react"
import { AudioContext } from "../context/AudioContext"


export const useAudioContext = () => {
    const context = useContext(AudioContext)      
    if(!context){
        throw Error(`useAuthContext must be used inside an AudioContextProvider`)        
    }
    return context
}