import React, {useEffect} from 'react'
import {useRouteError} from 'react-router-dom'
import {apiRejectMessages} from '../config/api'
import Info from '../components/UI/Info'
import {MetaTags} from 'react-meta-tags'

const Error = () => {
    const error = useRouteError()

    useEffect(() => {
        console.error(error?.statusText)
    }, [error])

    return (
        <main>
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME} — Неизвестная ошибка</title>
                <meta property="title" content={process.env.REACT_APP_SITE_NAME + ' — Неизвестная ошибка'} />
                <meta property="og:title" content={process.env.REACT_APP_SITE_NAME + ' — Неизвестная ошибка'} />
            </MetaTags>
            <Info>{apiRejectMessages.PAGE_ERROR}</Info>
        </main>
    )
}

export default Error
