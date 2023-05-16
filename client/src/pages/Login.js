import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../CSS Modules/LoginForm.module.css'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import {useLogin} from '../hooks/useLogin'

export const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,isLoading,emptyFields ,login ]   = useLogin()
  const [passwordType, setPasswordType] = useState('password')

  useEffect(() => {
    document.title = "Login - MusicFolks"
  }, [])

  const togglePassword = () => {
    setPasswordType(prev => {
      if (prev === 'password')
        return 'text'
      else
        return 'password'
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    login(username,password);
  }

  return (
    <div className={styles.log_form}>
      <form onSubmit={submitHandler} >
        <div className={styles.title} >LOG IN </div>
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
        {error ? <div className={styles.error}>{error}</div> : null}
        <div className={styles.btn_container}>
          Forget Password? <Link to="/users/reset">Reset</Link><br />
          <button type='submit' disabled={isLoading} className={styles.button} >LOG IN</button>
        </div>
      </form>
      <hr />
      <div className={styles.btn_container}>
        Don't have an account? <br />
        <Link to='/users/signup' ><button className={styles.button} >SIGN UP</button></Link>
      </div>      
    </div>
  )
}
