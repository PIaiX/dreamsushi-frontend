import React from 'react'
import Category from './Category'

const Categories = ({categories = []}) => {
    return (
        categories?.length &&
        categories.map((item) => (
            <Category key={item?.category?.id} category={item?.category} products={item?.products} />
        ))
    )
}

export default Categories
