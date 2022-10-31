import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../store/reducers/authSlice'
import alertReducer from '../store/reducers/alertSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        alert: alertReducer,
    },
})

export default store
