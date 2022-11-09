import {createSlice} from '@reduxjs/toolkit'
import {getCart} from '../../services/RTK/cart'

const initialState = {
    isLoading: false,
    error: null,
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
        resetCart: (state) => {
            state.items = initialState.items
        },
    },
    extraReducers: {
        [getCart.pending]: (state) => {
            state.isLoading = true
            state.error = null
        },
        [getCart.fulfilled]: (state, action) => {
            state.items = action?.payload?.products
            state.isLoading = false
        },
        [getCart.rejected]: (state, action) => {
            console.log('Get cart rejected', action.payload)
            state.isLoading = false
        },
    },
})

export const {createProduct, updateProduct, deleteProduct, resetCart} = cartSlice.actions

export default cartSlice.reducer
