import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from '../store/reducers/authSlice'
import checkoutReducer from '../store/reducers/checkoutSlice'
import alertReducer from '../store/reducers/alertSlice'
import cartReducer from '../store/reducers/cartSlice'
import favoriteReducer from '../store/reducers/favoriteSlice'
import { homeApi } from '../services/RTK/home'

const rootReducer = combineReducers({
    auth: authReducer,
    checkout: checkoutReducer,
    alert: alertReducer,
    cart: cartReducer,
    favorite: favoriteReducer,

    [homeApi.reducerPath]: homeApi.reducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['checkout', 'cart', 'favorite'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        getDefaultMiddleware().concat(homeApi.middleware)
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
    }
})
const persistor = persistStore(store)

export { persistor }
export default store
