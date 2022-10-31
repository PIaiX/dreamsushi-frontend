import React from 'react'
import {Route, Routes} from 'react-router-dom'
import AccountLayout from '../layouts/AccountLayout'
import OrderHistory from '../pages/account/OrderHistory'
import Profile from '../pages/account/Profile'

const AccountRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<AccountLayout />}>
                <Route index element={<Profile />} />
                <Route path="order-history" element={<OrderHistory />} />
            </Route>
        </Routes>
    )
}

export default AccountRouter
