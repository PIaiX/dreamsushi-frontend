import React from 'react'
import Category from './Category'

const Categories = (categories = []) => {
    return categories?.length && categories.map((category) => <Category key={category.id} category={category} />)
}

export default Categories
