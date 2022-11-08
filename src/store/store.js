import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from '../store/reducers/authSlice'
import alertReducer from '../store/reducers/alertSlice'
import cartReducer from '../store/reducers/cartSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    cart: cartReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
const persistor = persistStore(store)

export {persistor}
export default store
