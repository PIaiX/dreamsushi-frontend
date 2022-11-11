const BASE_URL = process.env.REACT_APP_BASE_URL

const apiRoutes = {
    // auth
    AUTH_REGISTRATION: '/auth/registration',
    AUTH_ACTIVATE: '/auth/activate',
    AUTH_LOGIN: '/auth/login',
    AUTH_REFRESH: '/auth/refresh',
    AUTH_LOGOUT: '/auth/logout',
    AUTH_RECOVERY: '/auth/recovery',

    // account
    ACCOUNT_EDIT: '/user/edit',
    ACCOUNT_GET_ADDRESSES: '/address/all',
    ACCOUNT_GET_ADDRESS: '/address/one/',
    ACCOUNT_CREATE_ADDRESS: '/address/create',
    ACCOUNT_EDIT_ADDRESS: '/address/edit/',
    ACCOUNT_DELETE_ADDRESS: '/address/delete',
    ACCOUNT_GET_ORDERS: '/order/all',
    ACCOUNT_GET_ORDER: '/order/one',
    ACCOUNT_GET_NOTIFICATIONS: '/notification/all',
    ACCOUNT_DELETE_NOTIFICATION: '/notification/delete',

    // category
    CATEGORY_ALL: '/category/all',
    CATEGORY_ONE: '/category/one',

    // product
    PRODUCT_ONE: '/product/one',
    PRODUCT_RECOMMENDATIONS: '/product/recommendations',

    // cart
    CART_ALL: '/cart',
    CART_CREATE: '/cart/create',
    CART_EDIT: '/cart/edit',
    CART_DELETE: '/cart/delete',
    CART_SYNC: '/cart/synchronization',

    // Search
    SEARCH_GET: '/search',

    // Sale
    SALES_GET: '/sale',

    // favorite
    FAVORITE_ALL: '/favorite',
    FAVORITE_TOGGLE: '/favorite/toggle',
    FAVORITE_SYNC: '/favorite/synchronization',
}

const apiResponseMessages = {
    // auth
    REGISTRATION: 'Вы успешно зарегистрировались и активировали свой аккаунт',
    RECOVERY: 'Ваш пароль был успешно обновлен',

    // cart
    CART_CREATE: 'Товар был успешно добавлен в корзину',
    CART_EDIT: 'Корзина обновлена',
    CART_DELETE: 'Товар был удален из корзины',

    // Address account
    ACCOUNT_ADDRESS_CREATE: 'Адрес успешно создан',
    ACCOUNT_ADDRESS_EDIT: 'Адрес успешно изменен',
    ACCOUNT_ADDRESS_DELETE: 'Адрес успешно удален',

    // favorite
    FAVORITE_CREATE: 'Товар добавлен в избранное',
    FAVORITE_DELETE: 'Товар удален из избранного',
    FAVORITE_SYNC: 'Список избранных обновлен',
}

const apiRejectMessages = {
    DEFAULT: 'Что-то пошло не так, повторите попытку позже',
    INVALID_KEY: 'Неверный ключ подтверждения',
    USER_EXISTS: 'Пользователь с таким номером уже существует',
    USER_NOT_FOUND: 'Такого пользователя не существует',
    USER_NOT_EXIST: 'Такого пользователя не существует',
    CART_NOT_VALID_COUNT: 'Значение не может быть меньше 1',
}

const apiErrors = {
    INVALID_KEY: 'INVALID_KEY',
    USER_EXISTS: 'USER_EXISTS',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    USER_NOT_EXIST: 'USER_NOT_EXIST',
}

export {BASE_URL, apiRoutes, apiResponseMessages, apiRejectMessages, apiErrors}
