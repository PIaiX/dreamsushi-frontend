import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isConnected: true,
    options: false,
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateConnect: (state, action) => {
            state.isConnected = action.payload
        },
        updateOptions: (state, action) => {
            state.options = action.payload
        },
    },
})

export const {updateConnect, updateOptions} = settingsSlice.actions

export default settingsSlice.reducer
