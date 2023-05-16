import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from 'react-toastify'

export const useReset = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])
    const [stage, setStage] = useState('CHECK')

    const navigate = useNavigate()

    const checkUser = (username, setSecurityQues) => {
        setIsLoading(true)
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL + `/api/users/check`,
            data: {
                username
            }
        })
            .then(response => {
                setStage("VERIFY")
                setError(null)
                setIsLoading(false)
                setEmptyFields([])
                setSecurityQues(response.data.user.security_ques);
            })
            .catch(err => {
                setError(err.response.data)
                setIsLoading(false)
                setEmptyFields(["username"])
            })
    }

    const verifyUser = (username, dob, security_ans) => {
        setIsLoading(true)
        setEmptyFields([])
        if (!dob || !security_ans) {
            if (!dob) {
                setEmptyFields(['dob'])
            }
            if (!security_ans) {
                setEmptyFields(prev => [...prev, 'securityAns'])
            }
            setError('Please Fill all the Fields')
            setIsLoading(false)
            return
        }
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL + `/api/users/securitycheck`,
            data: {
                username, security_ans,
                dob: dob.format()
            }
        })
            .then(response => {
                setStage("RESET")
                setError(null)
                setIsLoading(false)
                setEmptyFields([])
            })
            .catch(err => {
                setError(err.response.data.error)
                setIsLoading(false)
                setEmptyFields(err.response.data.error_field)
            })
    }

    const resetPassword = (username, password, confirmPassword) => {

        setIsLoading(true)
        setEmptyFields([])
        if (!password || !confirmPassword) {
            if (!password) {
                setEmptyFields(['password'])
            }
            if (!confirmPassword) {
                setEmptyFields(prev => [...prev, 'confirmPassword'])
            }
            setError('Please Fill all the Fields')
            setIsLoading(false)
            return
        }

        if (password !== confirmPassword) {
            const list = []
            list.push('confirmPassword')
            list.push('password')
            setEmptyFields(list)
            setError('Both the password must be equal')
            setIsLoading(false)
            return
        }

        axios({
            method: 'patch',
            url: process.env.REACT_APP_API_URL + `/api/users/resetpassword`,
            data: {
                username, password
            }
        })
            .then(response => {                
                setError(null)
                setIsLoading(false)
                setEmptyFields([])
                toast.success('Password Reset Successfully',{position:toast.POSITION.BOTTOM_RIGHT})
                navigate('/users/login')
            })
            .catch(err => {
                setError(err.response.data.error)
                setIsLoading(false)                
                setEmptyFields(err.response.data.error_field)
            })
    }

    return [error, isLoading, stage, emptyFields, checkUser, verifyUser,resetPassword]
}
