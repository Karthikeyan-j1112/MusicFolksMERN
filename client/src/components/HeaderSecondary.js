import React from 'react'
import {Link} from 'react-router-dom'
import styles from '../CSS Modules/HeaderSecondary.module.css'

export const HeaderSecondary = () => {
  return (
    <header className={styles.header}>
        <Link to='/'><img src='/Logo.jpg' alt='MusicFolks' className={styles.logo} /></Link>
    </header>
  )
}
