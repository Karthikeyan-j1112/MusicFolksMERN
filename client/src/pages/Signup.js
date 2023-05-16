import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../CSS Modules/LoginForm.module.css'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import DatePicker from 'react-multi-date-picker'
import { useSignup } from '../hooks/useSignup'

export const Signup = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [securityQues, setSecurityQues] = useState("What's Your First School Name?")
  const [securityAns, setSecurityAns] = useState('')
  const [passwordType, setPasswordType] = useState('password')
  const [confirmPasswordType, setConfirmPasswordType] = useState('password')
  const [error, isLoading, emptyFields, signup] = useSignup()
  const [passwordError, setPasswordError] = useState(null)

  useEffect(() => {
    document.title = "Signup - MusicFolks"    
  }, [])

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
  useEffect(() => {
    if (error === "Password is not strong enough") {
      setPasswordError(['8 characters long', 'contains one number',
        'contains one capital letter', 'contains one small letter',
        'contains one special character'])
    }
    else {
      setPasswordError(null)
    }
  }, [error])


  const submitHandler = (e) => {
    e.preventDefault();
    signup(username, password, confirmPassword, name, dob, securityQues, securityAns)
  }

  return (
    <div className={styles.log_form}>
      <form onSubmit={submitHandler} >
        <div className={styles.title} >SIGN UP</div>
        <label className={styles.label} >Username</label>
        <input
          type="text"
          className={!emptyFields.includes('username') ? styles.input : styles.error_input}
          placeholder="Enter email or phone number"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <label className={styles.label} >What should we call you?</label>
        <input
          type="text"
          className={!emptyFields.includes('name') ? styles.input : styles.error_input}
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
        <label className={styles.label} >Security Question</label>
        <select
          type="text"
          className={styles.input}
          value={securityQues}
          onChange={(e) => setSecurityQues(e.target.value)}
          style={{ width: "100%", height: "40px" }}
        >
          <option >What's Your First School Name?</option>
          <option >In which city were you born?</option>
          <option >What was your favorite food in childhood?</option>
        </select>

        <label className={styles.label} >Security Answer</label>
        <input
          type="text"
          className={!emptyFields.includes('securityAns') ? styles.input : styles.error_input}
          placeholder="Enter Answer for the Security Question"
          value={securityAns}
          onChange={(e) => setSecurityAns(e.target.value)}
        />

        {error ? <div className={styles.error}>{error}</div> : null}
        <div className={styles.btn_container}>
          <button type='submit' disabled={isLoading} className={styles.button} >SIGN UP</button>
        </div>
      </form>
      <hr />
      <div className={styles.btn_container}>
        Already have an account? <br />
        <Link to='/users/login' ><button className={styles.button} >LOG IN</button></Link>
      </div>
    </div>
  )
}
