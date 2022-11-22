import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    checkout: false
}

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setCheckout: (state, action) => {
            state.checkout = action?.payload
        },
        resetCheckout: (state) => {
            state.checkout = false
        },
    },
})

export const { setCheckout, resetCheckout } = checkoutSlice.actions

export default checkoutSlice.reducer
