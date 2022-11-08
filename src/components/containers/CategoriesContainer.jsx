import React from 'react'
import Container from 'react-bootstrap/Container'
import CategoriesMenu from '../CategoriesMenu'
import Categories from '../Categories'

const CategoriesContainer = ({categories = [], title, desc = ''}) => {
    return (
        <>
            <Container className="px-mobile-0">
                <section className="mb-6">
                    <h1 className="d-none d-md-block mb-3">{title ?? 'Меню'}</h1>
                    {desc}
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
