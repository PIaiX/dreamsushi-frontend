import React from 'react'
import Container from 'react-bootstrap/Container'
import CategoriesMenu from '../CategoriesMenu'
import Categories from '../Categories'

const CategoriesContainer = ({categories = []}) => {
    return (
        <>
            <Container className="px-mobile-0">
                <section className="mb-6">
                    <h1 className="d-none d-md-block">Меню</h1>
                    <CategoriesMenu categories={categories} />
                </section>
            </Container>

            <Container>
                <Categories categories={categories} />
            </Container>
        </>
    )
}

export default CategoriesContainer
