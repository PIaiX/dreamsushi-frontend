import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        createProduct: (state, action) => {
            state.items.push({...action?.payload?.product, count: 1})
        },
        updateProduct: (state, action) => {
            state.items = state.items.map((item) => {
                if (item.id === action?.payload?.productId) {
                    return {
                        ...item,
                        id: action?.payload?.productId,
                        count: action?.payload?.count,
                    }
                } else return item
            })
        },
        deleteProduct: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action?.payload?.productId)
        },
    },
})

export const {createProduct, updateProduct, deleteProduct} = cartSlice.actions

export default cartSlice.reducer
