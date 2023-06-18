import React from 'react'
import Category from './Category'

const Categories = ({categories = []}) => {
    return categories?.length > 0 && categories.map((item, index) => <Category key={index} item={item} id={index} />)
}

export default Categories
