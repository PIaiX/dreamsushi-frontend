import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import StoriesSection from '../components/StoriesSection'
import {getCategories} from '../services/category'
import CategoriesContainer from '../components/containers/CategoriesContainer'
import Loader from '../components/UI/Loader'
import Info from '../components/UI/Info'
import {getSales} from '../services/sale'

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
        console.log('cat', categories)
    }, [categories])

    useEffect(() => {
        getSales()
            .then((res) => res && setSale((prev) => ({...prev, isLoaded: true, items: res.sales})))
            .catch((error) => error && setSale((prev) => ({...prev, isLoaded: true, error})))
        getCategories()
            .then((res) => res && setCategories((prev) => ({...prev, isLoaded: true, items: res.categories})))
            .catch((error) => error && setCategories((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    if (!sale.isLoaded || !categories.isLoaded) {
        return <Loader full />
    }

    return (
        <main>
            {!sale?.error && sale?.items?.length && (
                <Container>
                    <StoriesSection sales={sale.items} />
                </Container>
            )}
            {!categories?.error ? (
                categories?.items?.length ? (
                    <CategoriesContainer categories={categories.items} />
                ) : (
                    <Info>Список категорий пуст</Info>
                )
            ) : (
                <Info>Не удалось загрузить список категорий</Info>
            )}
        </main>
    )
}

export default Home
