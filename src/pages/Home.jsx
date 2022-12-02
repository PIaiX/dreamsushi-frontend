import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import StoriesSection from '../components/StoriesSection'
import {getCategories} from '../services/category'
import CategoriesContainer from '../components/containers/CategoriesContainer'
import {getSales} from '../services/sale'
import {MetaTags} from 'react-meta-tags'
import Loader from '../components/UI/Loader'

const Home = () => {
    const [sale, setSale] = useState({
        items: [],
    })
    const [categories, setCategories] = useState({
        isLoaded: false,
        items: [],
    })

    useEffect(() => {
        getSales().then((res) => res && setSale((prev) => ({...prev, items: res.sales})))
        getCategories()
            .then((res) => res && setCategories((prev) => ({...prev, isLoaded: true, items: res.categories})))
            .finally(() => setCategories((prev) => ({...prev, isLoaded: true})))
    }, [])

    if (!categories.isLoaded) {
        return <Loader full />
    }

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
