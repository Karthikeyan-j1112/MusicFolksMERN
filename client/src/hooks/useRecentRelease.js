import axios from "axios"
import { useState } from "react"


export const useRecentRelease = () => {

    const [songs,setSongs] = useState([])

    const getSongs = (page) =>{
        axios.get((process.env.REACT_APP_API_URL + `/api/songs/recent`))
        .then(response=>{            
            setSongs(response.data)
        }).catch(err=>{
            console.log(err);
        })
    }

    return [songs,getSongs]
    
}
