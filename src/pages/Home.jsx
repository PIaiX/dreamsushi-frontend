import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import StoriesSection from '../components/StoriesSection'
import {getCategories} from '../services/category'
import CategoriesContainer from '../components/containers/CategoriesContainer'
import {getSales} from '../services/sale'
import {MetaTags} from 'react-meta-tags'

const Home = () => {
    const [sale, setSale] = useState({
        isLoaded: false,
        error: null,
        items: [],
    })
    const [categories, setCategories] = useState({
        isLoaded: false,
        error: null,
        items: [],
    })

    useEffect(() => {
        getSales()
            .then((res) => res && setSale((prev) => ({...prev, isLoaded: true, items: res.sales})))
            .catch((error) => error && setSale((prev) => ({...prev, isLoaded: true, error})))
        getCategories()
            .then((res) => res && setCategories((prev) => ({...prev, isLoaded: true, items: res.categories})))
            .catch((error) => error && setCategories((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    return (
        <main>
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME} — доставка суши, ролл и пиццы в Казани</title>
                <meta
                    property="title"
                    content={process.env.REACT_APP_SITE_NAME + ' — доставка суши, ролл и пиццы в Казани'}
                />
                <meta
                    property="og:title"
                    content={process.env.REACT_APP_SITE_NAME + ' — доставка суши, ролл и пиццы в Казани'}
                />
                <meta name="description" content={process.env.REACT_APP_SITE_DESCRIPTION} />
                <meta name="og:description" content={process.env.REACT_APP_SITE_DESCRIPTION} />
            </MetaTags>
            {!sale?.error && sale?.items?.length > 0 && (
                <Container>
                    <StoriesSection sales={sale.items} />
                </Container>
            )}
            {!categories?.error && categories?.items?.length > 0 && (
                <CategoriesContainer categories={categories.items} />
            )}
        </main>
    )
}

export default Home
