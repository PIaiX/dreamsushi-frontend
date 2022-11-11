import React, {useEffect} from 'react'
import {useRouteError} from 'react-router-dom'
import {apiRejectMessages} from '../config/api'
import Info from '../components/UI/Info'

const Error = () => {
    const error = useRouteError()

    useEffect(() => {
        console.error(error?.statusText)
    }, [error])

    return (
        <main>
            <Info>{apiRejectMessages.PAGE_ERROR}</Info>
        </main>
    )
}

export default Error
