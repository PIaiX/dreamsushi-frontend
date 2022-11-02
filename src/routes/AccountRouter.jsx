import React from 'react'
import {Route, Routes} from 'react-router-dom'
import AccountLayout from '../layouts/AccountLayout'
import OrderHistory from '../pages/account/OrderHistory'
import Profile from '../pages/account/Profile'
import Address from '../pages/account/address'
import AddressCreate from '../pages/account/address/Create'

const AccountRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<AccountLayout />}>
                <Route index element={<Profile />} />
                <Route path="order-history" element={<OrderHistory />} />
                <Route path="address" element={<Address />} />
                <Route path="address/create" element={<AddressCreate />} />
            </Route>
        </Routes>
    )
}

export default AccountRouter
