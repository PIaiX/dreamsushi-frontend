import {createSlice} from '@reduxjs/toolkit'
import {getFavorites} from '../../services/RTK/favorite'

const initialState = {
    isSync: false,
    isLoading: false,
    error: null,
    items: [],
    pagination: {},
}

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        toggleProduct: (state, action) => {
            if (action?.payload?.product) {
                const productItem = state.items.find((item) => item?.id === action?.payload?.product?.id)

                if (productItem) {
                    state.items = state.items.filter((item) => item?.id !== productItem?.id) || []
                } else state.items.push({...action?.payload?.product, isFavorite: true})
            }
        },
        resetFavorite: (state) => {
            state.isSync = false
            state.isLoading = false
            state.error = null
            state.items = []
            state.pagination = {}
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
            state.pagination = action?.payload?.pagination || {}
            state.isLoading = false
        },
        [getFavorites.rejected]: (state, action) => {
            console.log('Get favorites rejected', action.payload)
            state.isLoading = false
        },
    },
})

export const {toggleProduct, resetFavorite, setSync} = favoriteSlice.actions
export default favoriteSlice.reducer
