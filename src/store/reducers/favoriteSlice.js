import {createSlice} from '@reduxjs/toolkit'
import {getFavorites} from '../../services/favorites'

const initialState = {
    isSync: false,
    isLoading: false,
    error: null,
    items: [],
}

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        toggleProduct: (state, action) => {
            state.items = state.items.map((item) => {
                if (item.id === action?.payload?.productId) {
                    return {
                        ...item,
                        isFavorite: action?.payload?.isFavorite,
                    }
                } else return item
            })
        },
        resetFavorite: (state) => {
            state.isSync = initialState.isSync
            state.isLoading = initialState.isLoading
            state.error = initialState.error
            state.items = initialState.items
        },
        setSync: (state) => {
            state.isSync = true
        },
    },
    extraReducers: {
        // ! getFavorites
        [getFavorites.pending]: (state) => {
            state.isLoading = true
            state.error = null
        },
        [getFavorites.fulfilled]: (state, action) => {
            state.items = action?.payload?.products || []
            state.isLoading = false
        },
        [getFavorites.rejected]: (state, action) => {
            console.log('Get favorites rejected', action.payload)
            state.isLoading = false
        },
    },
})

export const {toggleProduct} = favoriteSlice.actions
export default favoriteSlice.reducer
