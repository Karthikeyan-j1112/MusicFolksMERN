import React, { useState } from 'react'
import styles from '../CSS Modules/LoginForm.module.css'
import DatePicker from 'react-multi-date-picker'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

export const ResetVerify = ({ dob, setDob, securityQues, emptyFields, securityAns, setSecurityAns }) => {
    return (
        <div>
            <label className={styles.label} >Date of Birth</label><br />
            <DatePicker
                inputClass={!emptyFields.includes('dob') ? styles.date : styles.error_date}
                value={dob}
                onChange={(value) => setDob(value)}
                format='YYYY-MM-DD'
                placeholder='Enter DOB'
                calendarPosition='bottom-center'
                containerStyle={{ width: "100%" }}
            />
            <label className={styles.label} >Security Question:</label>
            <div style={{ padding: "5px 0px 15px 0px" }}>{securityQues}</div>
            <label className={styles.label} >Answer for the Above question</label>
            <input
                type="text"
                className={!emptyFields.includes('securityAns') ? styles.input : styles.error_input}
                placeholder="Enter the Answer for the Security Question"
                value={securityAns}
                onChange={(e) => setSecurityAns(e.target.value)}
            />
        </div>
    )
}

export const Reset = ({password, setPassword, confirmPassword, setConfirmPassword, emptyFields, passwordError}) => {
    const [passwordType, setPasswordType] = useState('password')
    const [confirmPasswordType, setConfirmPasswordType] = useState('password')

    const togglePassword = () => {
        setPasswordType(prev => {
            if (prev === 'password')
                return 'text'
            else
                return 'password'
        })
    }
    const togglePasswordTwo = () => {
        setConfirmPasswordType(prev => {
            if (prev === 'password')
                return 'text'
            else
                return 'password'
        })
    }
    return (
        <div>
            <label className={styles.label} >Password </label>
            <div onClick={togglePassword} className={styles.passwordIcon} >
                {passwordType === 'password' ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
            <input
                className={!emptyFields.includes('password') ? styles.input : styles.error_input}
                type={passwordType}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError ?
                <div className={styles.error} >
                    Password must be: <br />
                    {
                        passwordError.map((item, index) => <li key={index}>{item}</li>)
                    }
                </div> :
                null}
            <label className={styles.label} >Confirm Password</label>
            <div onClick={togglePasswordTwo} className={styles.passwordIcon} >
                {confirmPasswordType === 'password' ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
            <input
                className={!emptyFields.includes('confirmPassword') ? styles.input : styles.error_input}
                type={confirmPasswordType}
                placeholder="Enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </div>
    )
}
