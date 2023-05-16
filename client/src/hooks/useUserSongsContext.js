import { useContext } from "react"
import { UserSongsContext } from "../context/UserSongsContext"

export const useUserSongsContext = () => {
    const context = useContext(UserSongsContext)      
    if(!context){
        throw Error(`useUserSongsContext must be used inside an UserSongsContextProvider`)        
    }
    return context
}