import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import addressPickupSlice from './reducers/addressPickupSlice'
import addressSlice from './reducers/addressSlice'
import alertSlice from './reducers/alertSlice'
import authSlice from './reducers/authSlice'
import cartSlice from './reducers/cartSlice'
import checkoutSlice from './reducers/checkoutSlice'
import favoriteSlice from './reducers/favoriteSlice'
import settingsSlice from './reducers/settingsSlice'
import {homeApi} from '../services/RTK/home'

const rootReducer = combineReducers({
    settings: settingsSlice,
    alert: alertSlice,
    auth: authSlice,
    cart: cartSlice,
    favorite: favoriteSlice,
    checkout: checkoutSlice,
    address: addressSlice,
    addressPickup: addressPickupSlice,
    [homeApi.reducerPath]: homeApi.reducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['checkout', 'cart', 'favorite', 'address', 'addressPickup'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        getDefaultMiddleware().concat(homeApi.middleware)
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
    },
})
const persistor = persistStore(store)

export {persistor}
export default store
