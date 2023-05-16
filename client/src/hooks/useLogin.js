import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])
    const { dispatchUser } = useAuthContext();
    const navigate = useNavigate()

    const login = (username, password) => {
        setIsLoading(true)
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL + `/api/users/login`,
            data: {
                username,
                password
            }
        })
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.data))
                dispatchUser({ type: 'LOGIN', payload: (response.data) })
                setError(null)
                setIsLoading(false)
                setEmptyFields([])
                navigate('/')
            })
            .catch(err => {
                setError(err.response.data.error)
                setIsLoading(false)
                setEmptyFields(err.response.data.error_field)
            })
    }

    return [error, isLoading, emptyFields, login]
}
