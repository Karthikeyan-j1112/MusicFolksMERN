import React from 'react'
import styles from '../CSS Modules/Queue.module.css'

export const Queue = () => {


    return (
        <div className={styles.queue} >
            <h2 className={styles.headOne} >Queue</h2>
            <h3 className={styles.headTwo} >Now playing</h3>
            <table><tr>
                <td>
                    <img src='http://drive.google.com/uc?export=view&id=' />
                </td>
            </tr></table>
        </div>
    )
}

