import React, { useEffect, useState } from 'react'
import styles from '../CSS Modules/Header.module.css'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightFromSquare, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {GoSearch} from 'react-icons/go'
import { IoCloseCircle } from 'react-icons/io5'

export const Header = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const navigate = useNavigate();

    const noUser = () => {
        return (
            <>
                <Link to='/users/signup'> <button className={styles.signup_btn}>Sign up</button> </Link>
                <Link to='users/login'> <button className={styles.login_btn} >Log in</button> </Link>
            </>
        )
    }
    const existingUser = () => {
        return (
            <>
                <button className={styles.name_btn} ><div className={styles.name}>{user.name}</div> <FontAwesomeIcon icon={faUpRightFromSquare} className={styles.icon} /> </button>
                <button
                    className={styles.logout_btn}
                    onClick={() => {
                        logout();
                        navigate('/');
                    }} >
                    <div className={styles.logout}>Logout</div>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className={styles.icon} />
                </button>
            </>
        )
    }

    const [searchInput, setSearchInput] = useState('')

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {        
        if (window.location.pathname.split('/')[1] === "search")
            setSearchInput(searchParams.get('song'))
        else{
            setSearchInput('')
        }
    }, [searchParams])

    return (
        <header className={styles.header} >
            <div className={styles.search_bar}>
                {
                    (window.location.pathname.split('/')[1] === "search") ? (
                        <>
                            <GoSearch size='25px' className={styles.search_logo} />
                            <input
                                className={styles.search_input}
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value)
                                    setSearchParams({ song: e.target.value })
                                }}
                                placeholder='What you Like to Listen'
                            />
                            {searchInput ?
                                <IoCloseCircle
                                    onClick={() => { 
                                        setSearchParams() 
                                        setSearchInput("")
                                    }}
                                    className={styles.close_logo}
                                />
                                : null
                            }
                        </>
                    ) : null
                }
            </div>
            <div className={styles.buttons}>
                {user ? existingUser() : noUser()}
            </div>
        </header>
    )
}
