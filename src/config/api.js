const SITE_URL = 'https://dreamsushi.ru'
const BASE_URL = 'https://api.dreamsushi.ru'
const DADATA_URL_STREET = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
const DADATA_URL_ADDRESS = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/address'
const DADATA_TOKEN = '75e4dbde399d9ff27f2568b852252b7964ad0f92'
const DADATA_SECRET = '3a48a9c470e2a537eee392bc6e88e4a64efdc3f4'

const apiRoutes = {
    OPTIONS: '/option',
    GET_PROMO: '/promo/one',

    // auth
    AUTH_REGISTRATION: '/auth/registration',
    AUTH_ACTIVATE: '/auth/activate',
    AUTH_LOGIN: '/auth/login',
    AUTH_CHECK: '/auth/check',
    AUTH_REFRESH: '/auth/refresh',
    AUTH_LOGOUT: '/auth/logout',
    AUTH_RECOVERY: '/auth/recovery',
    AUTH_EDIT_EMAIL: '/auth/editEmail',

    // account
    ACCOUNT_EDIT: '/user/edit',
    ACCOUNT_SAVE_PUSHTOKEN: '/user/pushToken',
    ACCOUNT_ADDRESSES_GET: '/address/all',
    ACCOUNT_ADDRESS_GET: '/address/one/',
    ACCOUNT_ADDRESS_CREATE: '/address/create',
    ACCOUNT_ADDRESS_EDIT: '/address/edit/',
    ACCOUNT_ADDRESS_MAIN: '/address/main',
    ACCOUNT_ADDRESS_DELETE: '/address/delete',
    ACCOUNT_COMPLAIN_CREATE: '/user/createComplain',
    ACCOUNT_ORDERS_GET: '/order/all',
    ACCOUNT_ORDER_GET: '/order/one',

    ACCOUNT_NOTIFICATIONS_GET: '/notification/all',
    ACCOUNT_NOTIFICATION_DELETE: '/notification/delete',

    ACCOUNT_DELETE: '/user/deleteAccount',

    // category
    CATEGORY_ALL: '/category/all',
    CATEGORY_ONE: '/category/one',

    // product
    PRODUCT_ONE: '/product/one',
    PRODUCT_RECOMMENDATIONS: '/product/recommendations',
    PRODUCT_GIFTS: '/product/gifts',
    PRODUCT_PERSON: '/product/person',

    // cart
    CART_ALL: '/cart',
    CART_CREATE: '/cart/create',
    CART_EDIT: '/cart/edit',
    CART_DELETE: '/cart/delete',
    CART_RESET: '/cart/reset',
    CART_SYNC: '/cart/synchronization',
    CART_PRODUCTS: '/cart/cartProducts',

    // Checkout, Order
    ORDER_CREATE: '/order/create',

    // Search
    SEARCH_GET: '/search',

    // Sale
    SALES_GET: '/sale',
    SALE_GET: '/sale/one',

    // Favorite
    FAVORITE_ALL: '/favorite',
    FAVORITE_TOGGLE: '/favorite/toggle',
    FAVORITE_SYNC: '/favorite/synchronization',
}

const apiResponseMessages = {
    // auth
    REGISTRATION: 'Вы успешно зарегистрировались и активировали свой аккаунт',
    RECOVERY: 'Ваш пароль был успешно обновлен',

    // order
    ORDER_CREATE: 'Заказ успешно отпрлавен',

    // cart
    CART_CREATE: 'Товар был успешно добавлен в корзину',
    CART_EDIT: 'Корзина обновлена',
    CART_DELETE: 'Товар был удален из корзины',

    // Address account
    ACCOUNT_ADDRESS_CREATE: 'Адрес успешно создан',
    ACCOUNT_ADDRESS_EDIT: 'Адрес успешно изменен',
    ACCOUNT_ADDRESS_DELETE: 'Адрес успешно удален',

    // Favorite
    FAVORITE_CREATE: 'Товар добавлен в избранное',
    FAVORITE_DELETE: 'Товар удален из избранного',
    FAVORITE_SYNC: 'Список избранных обновлен',

    // Complain account
    ACCOUNT_COMPLAIN_CREATE: 'Ваше сообщение успешно отправлено',
}

const apiRejectMessages = {
    DEFAULT: 'Что-то пошло не так, повторите попытку позже',
    INVALID_KEY: 'Неверный ключ подтверждения',
    USER_EXISTS: 'Пользователь с таким номером уже существует',
    USER_NOT_FOUND: 'Такого пользователя не существует',
    USER_NOT_EXIST: 'Такого пользователя не существует',
    CART_NOT_VALID_COUNT: 'Значение не может быть меньше 1',
    PAGE_ERROR: 'Не удалось загрузить страницу, вернитесь назад или перезагрузите страницу',
}

const apiErrors = {
    INVALID_KEY: 'INVALID_KEY',
    USER_EXISTS: 'USER_EXISTS',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    USER_NOT_EXIST: 'USER_NOT_EXIST',
}

export {
    BASE_URL,
    SITE_URL,
    DADATA_URL_STREET,
    DADATA_URL_ADDRESS,
    DADATA_TOKEN,
    DADATA_SECRET,
    apiRoutes,
    apiResponseMessages,
    apiRejectMessages,
    apiErrors,
}
