import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    error: null,
    items: [],
}

const addressPickupSlice = createSlice({
    name: 'addressPickup',
    initialState,
    reducers: {
        mainAddressPickupEdit: (state, action) => {
            state.items = state.items.map((e) => {
                e.main = e.id === action?.payload?.id
                return e
            })
        },
        updateAddressesPickup: (state, action) => {
            state.items = action.payload
        },
    },
})

export const {mainAddressPickupEdit, updateAddressesPickup} = addressPickupSlice.actions

export default addressPickupSlice.reducer
