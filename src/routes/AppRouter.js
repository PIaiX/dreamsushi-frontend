import React from 'react';
import { useRoutes, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Product from '../pages/Product';
import Favorites from '../pages/Favorites';
import ShoppingCart from '../pages/ShoppingCart';
import Delivery from '../pages/Delivery';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import Checkout from '../pages/Checkout';
import Сonfirmation from '../pages/Сonfirmation';
import PersonalAccount from '../pages/PersonalAccount';

export const routeList = [
    {
      path: '/',
      element: <Layout/>,
      children: [
        {index: true, element: <Home />},
        {path: 'product', element: <Product />},
        {path: 'favorites', element: <Favorites />},
        {path: 'cart', element: <ShoppingCart/>},
        {path: 'cart/checkout', element: <Checkout/>},
        {path: 'cart/checkout/confirmation', element: <Сonfirmation/>},
        {path: 'delivery', element: <Delivery/>},
        {path: 'about', element: <About/>},
        {path: 'personal-account', element: <PersonalAccount />},
        {path: '*', element: <NotFound/>},
      ],
    },
  ];

export default function AppRouter() {
    const Wrapper = ({ children }) => {
      const {pathname} = useLocation();
      useLayoutEffect(() => document.documentElement.scrollTo(0, 0), [pathname])
      return children
    }
  
    const element = useRoutes(routeList)
  
    return (
      <Wrapper>
          {element}
      </Wrapper>
    );
  }