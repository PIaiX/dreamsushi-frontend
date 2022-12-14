import React from 'react'
import {Outlet, ScrollRestoration} from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ActionAlert from '../components/utils/ActionAlert'

const AppLayout = () => {
    return (
        <>
            <ActionAlert delay={3000} />
            <ScrollRestoration />

            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default AppLayout
