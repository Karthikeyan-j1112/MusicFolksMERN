import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import styles from '../CSS Modules/Navbar.module.css'

import { HiHome, HiOutlineHome } from 'react-icons/hi'
import { BiSearch, BiSearchAlt } from 'react-icons/bi'
import { MdLibraryMusic, MdOutlineLibraryMusic, } from 'react-icons/md'

export const NavBar = () => {

    const navLinkStyle = ({ isActive }) => {
        return ({
            color: (isActive) ? 'white' : 'grey'
        })
    }

    const location = useLocation()

    return (
        <>
            <Link to='/'>  <img src='/Logo.jpg' alt='MusicFolks' className={styles.Left_logo} /></Link>
            <NavLink to="/" style={navLinkStyle} >
                <div className={styles.Left_div}>
                    {location.pathname === '/' ? <HiHome size='30px' className={styles.logos} /> : <HiOutlineHome size='30px' className={styles.logos} />}
                    <div className={styles.titles}>Home</div>
                </div>
            </NavLink>
            <NavLink to="/search" style={navLinkStyle} >
                <div className={styles.Left_div}>
                    {location.pathname === '/search' ? <BiSearchAlt size='30px' className={styles.logos} /> : <BiSearch size='30px' className={styles.logos} />}
                    <div className={styles.titles}>Search</div>
                </div>
            </NavLink>
            <NavLink to="/library" style={navLinkStyle} >
                <div className={styles.Left_div} >
                    {location.pathname === '/library' ? <MdLibraryMusic size='30px' className={styles.logos} /> : <MdOutlineLibraryMusic size='30px' className={styles.logos} />}
                    <div className={styles.titles}>Library</div>
                </div>
            </NavLink >
        </>
    )
}
