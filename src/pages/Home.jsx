import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import StoriesSection from '../components/StoriesSection'
import {getCategories} from '../services/category'
import CategoriesContainer from '../components/containers/CategoriesContainer'
import Loader from '../components/UI/Loader'
import Info from '../components/UI/Info'

const Home = () => {
    const [categories, setCategories] = useState({
        isLoaded: false,
        error: null,
        items: [],
    })

    useEffect(() => {
        getCategories()
            .then((res) => res && setCategories((prev) => ({...prev, isLoaded: true, items: res.categories})))
            .catch((error) => error && setCategories((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    return (
        <main>
            <Container>
                <StoriesSection />
            </Container>

            {!categories?.error ? (
                categories.isLoaded ? (
                    categories?.items?.length ? (
                        <CategoriesContainer categories={categories.items} />
                    ) : (
                        <Info>Список категорий пуст</Info>
                    )
                ) : (
                    <div className="d-flex justify-content-center align-items-center">
                        <Loader size={150} />
                    </div>
                )
            ) : (
                <Info>Не удалось загрузить список категорий</Info>
            )}
        </main>
    )
}

export default Home
