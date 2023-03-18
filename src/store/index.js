import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import addressSlice from './reducers/addressSlice'
import addressPickupSlice from './reducers/addressPickupSlice'
import authSlice from './reducers/authSlice'
import cartSlice from './reducers/cartSlice'
import checkoutSlice from './reducers/checkoutSlice'
import favoriteSlice from './reducers/favoriteSlice'
import settingsSlice from './reducers/settingsSlice'

const rootReducer = combineReducers({
    settings: settingsSlice,
    auth: authSlice,
    cart: cartSlice,
    favorite: favoriteSlice,
    checkout: checkoutSlice,
    address: addressSlice,
    addressPickup: addressPickupSlice,
})

const persistConfig = {
    key: 'root',
    storage: localStorage,
    whitelist: ['checkout', 'cart', 'favorite', 'address', 'addressPickup'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
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
