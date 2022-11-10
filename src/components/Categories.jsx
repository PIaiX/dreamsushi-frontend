import React from 'react'
import Category from './Category'

const Categories = ({categories = []}) => {
    return (
        categories?.length > 0 &&
        categories.map((item) => (
            <Category key={item?.category?.id} category={item?.category} products={item?.products} />
        ))
    )
}

export default Categories
