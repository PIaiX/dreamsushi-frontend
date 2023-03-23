import React from 'react'
import Products from './Products'

const Category = ({category = {}, data = []}) => {
    return (
        data?.length > 0 && (
            <section id={`categorie-${category}`} className="mb-6">
                <h2>{category}</h2>
                <Products products={data} />
            </section>
        )
    )
}

export default Category
