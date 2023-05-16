import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])
    const {dispatchUser} = useAuthContext()
    const navigate = useNavigate()

    const signup = (username, password, confirmPassword, name, dob, securityQues, securityAns) => {

        setIsLoading(true)
        setEmptyFields([])

        let emptyCount = 0;
        if (username === '' || username === null) {
            setEmptyFields(['username'])
            emptyCount++;
        }
        if (password === '' || password === null) {
            setEmptyFields(prev => [...prev, 'password'])
            emptyCount++;
        }
        if (confirmPassword === '' || confirmPassword === null) {
            setEmptyFields(prev => [...prev, 'confirmPassword'])
            emptyCount++;
        }
        if (name === '' || name === null) {
            setEmptyFields(prev => [...prev, 'name'])
            emptyCount++;
        }
        if (dob === '' || dob === null) {
            setEmptyFields(prev => [...prev, 'dob'])
            emptyCount++;
        }
        if (securityAns === '' || securityAns === null) {
            setEmptyFields(prev => [...prev, 'securityAns'])
            emptyCount++;
        }        
        if (emptyCount > 0) {
            setError('All Fields must be filled')
            setIsLoading(false)
            return
        }
        else if (password !== confirmPassword) {
            setEmptyFields(prev => [...prev, 'password', 'confirmPassword'])
            setError('Entered Passwords are mismatching')
            setIsLoading(false)
            return
        }
        else if (name.length <= 3) {
            setEmptyFields(prev => [...prev, 'name'])
            setError('Name must be atleast 4 Characters')
            setIsLoading(false)
            return;
        }
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL + `/api/users/signup`,
            data: {
                username, password,
                dob: dob.format(),
                name,
                security_ques: securityQues,
                security_ans: securityAns
            }
        }).then(response => {            
            localStorage.setItem('user',JSON.stringify(response.data))
            dispatchUser({type: 'LOGIN', payload: (response.data)})
            setError(null)
            setIsLoading(false)
            navigate('/')
        }).catch(err => {
            setEmptyFields(err.response.data.error_field)
            setError(err.response.data.error)
            setIsLoading(false)
        })
    }

    return [error, isLoading, emptyFields, signup]
}
