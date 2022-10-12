import React from 'react';
import { useRoutes, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Product from '../pages/Product';

export const routeList = [
    {
      path: '/',
      element: <Layout/>,
      children: [
        {index: true, element: <Home />},
        // {path: 'catalog', element: <Catalog/> , breadcrumb: 'Каталог'},
        // {path: 'catalog/category', element: <Category/> , breadcrumb: 'Подкаталог'},
        {path: 'product', element: <Product />},
        // {path: 'search', element: <Search/>, breadcrumb: 'Поиск'},
        // {path: 'favorites', element: <Favorites/> , breadcrumb: 'Избранное'},
        // {path: 'contacts', element: <Contacts /> , breadcrumb: 'Контактная информация'},
        // {path: 'articles', element: <Articles/> , breadcrumb: 'Статьи и советы'},
        // {path: 'articles/article', element: <Article/> , breadcrumb: 'Статья'},
        // {path: 'delivery', element: <Delivery /> , breadcrumb: 'Доставка'},
        // {path: 'cart', element: <ShoppingCart /> , breadcrumb: 'Корзина'},
        // {path: 'cart/checkout', element: <Checkout /> , breadcrumb: 'Оформление заказа'},
        // {path: 'registration', element: <Registration /> , breadcrumb: 'Регистрация'},
        // {path: 'login', element: <Login /> , breadcrumb: 'Вход в личный кабинет'},
        // {path: 'reset-password', element: <ResetPassword /> , breadcrumb: 'Восстановление пароля'},
        // {path: 'personal-account/*', element: <PersonalAccount /> , breadcrumb: 'Личный кабинет'},
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