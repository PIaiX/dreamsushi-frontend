import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import Home from '../pages/Home'
import Product from '../pages/Product'
import Favorites from '../pages/Favorites'
import ShoppingCart from '../pages/ShoppingCart'
import Delivery from '../pages/Delivery'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import Checkout from '../pages/Checkout'
import Confirmation from '../pages/Сonfirmation'
import PersonalAccount from '../pages/PersonalAccount'

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {index: true, element: <Home />},
            {path: 'product', element: <Product />},
            {path: 'favorites', element: <Favorites />},
            {path: 'cart', element: <ShoppingCart />},
            {path: 'cart/checkout', element: <Checkout />},
            {path: 'cart/checkout/confirmation', element: <Confirmation />},
            {path: 'delivery', element: <Delivery />},
            {path: 'about', element: <About />},
            {path: 'personal-account', element: <PersonalAccount />},
            {path: '*', element: <NotFound />},
        ],
    },
])

const AppRouter = () => {
    return <RouterProvider router={router} />
}

export default AppRouter
