import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    promo: false,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartUpdate: (state, action) => {
            let isCart = state.items.findIndex((e) => {
                if (e.id === action?.payload?.product?.id) {
                    if (e?.options && action?.payload?.product?.options) {
                        return JSON.stringify(e.options) === JSON.stringify(action.payload.product.options)
                    }
                    return true
                }
            })
            if (isCart != -1) {
                state.items[isCart] = {
                    ...action.payload.product,
                    count: action?.payload?.count ?? state.items[isCart].count,
                }
            } else {
                state.items.push({...action?.payload?.product, count: action?.payload?.count ?? 1})
            }
        },
        cartPromo: (state, action) => {
            if (action?.payload) {
                state.promo = action.payload
            }
        },
        cartDeletePromo: (state) => {
            state.promo = false
        },
        cartDelete: (state, action) => {
            let isCart = state.items.findIndex((e) => {
                if (e.id === action?.payload?.product?.id) {
                    if (e?.options && action?.payload?.product?.options) {
                        return JSON.stringify(e.options) === JSON.stringify(action.payload.product.options)
                    }
                    return true
                }
            })
            if (isCart != -1) {
                state.items.splice(isCart, 1)
            }
        },
        cartReset: (state) => {
            state.promo = false
            state.items = []
        },
    },
})

export const {cartUpdate, cartPromo, cartDelete, cartDeletePromo, cartReset} = cartSlice.actions

export default cartSlice.reducer
