import React from 'react'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import Home from '../pages/Home'
import Product from '../pages/Product'
import Favorites from '../pages/Favorites'
import ShoppingCart from '../pages/ShoppingCart'
import Delivery from '../pages/Delivery'
import About from '../pages/About'
import Checkout from '../pages/Checkout'
import Confirmation from '../pages/Сonfirmation'
import AccountRouter from './AccountRouter'
import NotFound from '../pages/NotFound'
import AuthRoute from '../layouts/AuthRoute'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Product />}>
                <Route path=":id" element={<Product />} />
            </Route>
            <Route path="favorites" element={<Favorites />} />
            <Route path="cart" element={<ShoppingCart />} />
            <Route path="cart/checkout" element={<Checkout />} />
            <Route path="cart/checkout/confirmation" element={<Confirmation />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="about" element={<About />} />
            <Route
                path="account/*"
                element={
                    <AuthRoute>
                        <AccountRouter />
                    </AuthRoute>
                }
            />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
)

const AppRouter = () => {
    return <RouterProvider router={router} />
}

export default AppRouter
