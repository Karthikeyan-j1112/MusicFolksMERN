import React, { useEffect } from 'react'
import styles from '../CSS Modules/Home.module.css'
import { Song } from './Song'
import { useRecentRelease } from '../hooks/useRecentRelease'
export const Home = () => {

  const [songs, getSongs] = useRecentRelease();

  useEffect(() => {
    document.title = "Home - MusicFolks"
    getSongs(0)
  },[])

  return (
    <>
      <div className={styles.set}>
        <div className={styles.head}>
          <div className={styles.title} >Recent Release</div>
          <div className={styles.show_more}>Show more</div>
        </div>
        <div className={styles.songs_container}>
          {songs.map(song => <Song key={song._id} song={song}  />)}
        </div>
      </div>
    </>
  )
}
