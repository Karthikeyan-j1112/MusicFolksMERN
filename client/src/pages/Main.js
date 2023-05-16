import React from 'react'
import { NavBar } from '../components/NavBar'
import { Outlet } from 'react-router'
import { Header } from '../components/Header'
import styles from '../CSS Modules/Main.module.css'
import { FooterPlayer } from '../components/FooterPlayer'

export const Main = () => {
  return (
    <>
      <div className={styles.main} >
        <div className={styles.navbar}>
          <NavBar />
        </div>
        <div className={styles.right} >
          <Header />
          <div className={styles.view}>
            <Outlet />
          </div>
        </div>
      </div>
      <FooterPlayer />
    </>
  )
}
