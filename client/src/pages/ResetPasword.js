import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../CSS Modules/LoginForm.module.css'
import { useReset } from '../hooks/useReset'
import { Reset, ResetVerify } from '../components/ResetContainer'

export const ResetPasword = () => {
  const [username, setUsername] = useState('');

  const [securityQues, setSecurityQues] = useState('')
  const [securityAns, setSecurityAns] = useState(null)
  const [dob, setDob] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState(null)

  const [error, isLoading, stage, emptyFields, checkUser, verifyUser,resetPassword] = useReset()
  const submitHandler = (e) => {
    e.preventDefault();
    switch (stage) {
      case 'CHECK':
        checkUser(username, setSecurityQues)
        break;
      case 'VERIFY':
        verifyUser(username, dob, securityAns)
        break;
      case 'RESET':
        resetPassword(username,password,confirmPassword)
        break;
      default:
        break;
    }

  }
  const renderSwitch = () => {
    switch (stage) {
      case 'VERIFY':
        return <ResetVerify
          dob={dob} setDob={setDob}
          securityAns={securityAns} setSecurityAns={setSecurityAns}
          securityQues={securityQues} emptyFields={emptyFields}
        />
      case 'RESET':
        return <Reset
          password={password} setPassword={setPassword}
          confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
          emptyFields={emptyFields} passwordError={passwordError} />
      default:
        return null
    }
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

  return (
    <div className={styles.log_form}>
      <form onSubmit={submitHandler} >
        <div className={styles.title} >RESET</div>
        <label className={styles.label} >Username</label>
        <input
          type="text"
          className={!emptyFields.includes('username') ? styles.input : styles.error_input}
          placeholder="Enter email or phone number"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={stage === 'CHECK' ? false : true}
        />
        {renderSwitch()}
        {error ? <div className={styles.error}>{error}</div> : null}
        <div className={styles.btn_container}>
          <button type='submit' disabled={isLoading} className={styles.button}>{stage}</button>
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

