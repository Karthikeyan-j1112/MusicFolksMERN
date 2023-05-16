import React from 'react'
import { HeaderSecondary } from '../components/HeaderSecondary'
import { Outlet } from 'react-router'

export const Users = () => {
    return (
        <>
            <HeaderSecondary />
            <Outlet />            
        </>
    )
}
