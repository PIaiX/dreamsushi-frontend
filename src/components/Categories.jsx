import React from 'react'
import Category from './Category'

const Categories = ({categories = []}) => {
    return (
        categories?.length > 0 &&
        categories.map((item) => <Category key={item?.title} category={item?.title} data={item?.data} />)
    )
}

export default Categories
