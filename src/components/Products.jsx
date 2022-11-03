import React from 'react'
import ProductItem from './ProductItem'

const Products = (products = []) => {
    return products?.length && products.map((product) => <ProductItem key={product.id} product={product} />)
}

export default Products
