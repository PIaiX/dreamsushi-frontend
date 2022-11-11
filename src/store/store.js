import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from '../store/reducers/authSlice'
import alertReducer from '../store/reducers/alertSlice'
import cartReducer from '../store/reducers/cartSlice'
import favoriteReducer from '../store/reducers/favoriteSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'favorite'],
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
