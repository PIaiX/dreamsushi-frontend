import React from 'react'
import Container from 'react-bootstrap/Container'
import {MetaTags} from 'react-meta-tags'
import {Link} from 'react-router-dom'

const NotFound = () => {
    return (
        <main>
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME} — Страница не найдена</title>
                <meta property="title" content={process.env.REACT_APP_SITE_NAME + ' — Страница не найдена'} />
                <meta property="og:title" content={process.env.REACT_APP_SITE_NAME + ' — Страница не найдена'} />
            </MetaTags>
            <Container className="pt-5">
                <h2 className="text-center fs-40 mb-4">404</h2>
                <h1 className="text-center">Страница не найдена</h1>
                <Link to="/" className="btn-2 mx-auto">
                    Вернуться к меню
                </Link>
            </Container>
        </main>
    )
}

export default NotFound
