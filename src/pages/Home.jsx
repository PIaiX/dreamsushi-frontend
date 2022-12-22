import React from 'react'
import Container from 'react-bootstrap/Container'
import {MetaTags} from 'react-meta-tags'
import CategoriesContainer from '../components/containers/CategoriesContainer'
import StoriesSection from '../components/StoriesSection'
import Loader from '../components/UI/Loader'
import {useGetCategoriesQuery, useGetSalesQuery} from '../services/RTK/home'

const Home = () => {
    const sales = useGetSalesQuery()
    const categories = useGetCategoriesQuery()

    return (
        <main>
            {(sales.isLoading || categories.isLoading) && <Loader full />}
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
            {!sales?.data?.error && sales?.data?.sales?.length > 0 && (
                <Container>
                    <StoriesSection sales={sales.data.sales} />
                </Container>
            )}
            {!categories.error && categories?.data?.categories?.length > 0 && (
                <CategoriesContainer categories={categories.data.categories} />
            )}
        </main>
    )
}

export default Home
