import React from 'react'
import Products from './Products'

const Category = ({item, id, data = []}) => {
    return (
        item?.data?.length > 0 && (
            <section id={`categorie-${id}`} className="mb-6">
                <h2>{item.title}</h2>
                <Products products={item.data} />
            </section>
        )
    )
}

export default Category
