import React from 'react'
import Products from './Products'

const Category = ({category = {}, products = []}) => {
    return (
        <section id={`categorie-${category?.id}`} className="mb-6">
            <h2>{category?.title}</h2>
            <Products products={products} />
        </section>
    )
}

export default Category
