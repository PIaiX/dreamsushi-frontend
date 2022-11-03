import React from 'react'
import {Route, Routes} from 'react-router-dom'
import AccountLayout from '../layouts/AccountLayout'
import Profile from '../pages/account'
import AddressEdit from '../pages/account/address/Edit'
import AddressCreate from '../pages/account/address/Create'
import Addresses from '../pages/account/address'
import Orders from '../pages/account/order'
import OrderView from '../pages/account/order/View'

const AccountRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<AccountLayout />}>
                <Route index element={<Profile />} />

                <Route path="addresses" element={<Addresses />} />
                <Route path="address/:addressId" element={<AddressEdit />} />
                <Route path="address/create" element={<AddressCreate />} />

                <Route path="orders" element={<Orders />} />
                <Route path="order/:orderId" element={<OrderView />} />
            </Route>
        </Routes>
    )
}

export default AccountRouter
