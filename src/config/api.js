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
    ACCOUNT_ADDRESSES: '/address/all',

    // category
    CATEGORY_ALL: '/category/all',
    CATEGORY_ONE: '/category/one',
}

const apiResponseMessages = {
    REGISTRATION: 'Вы успешно зарегистрировались и активировали свой аккаунт',
    RECOVERY: 'Ваш пароль был успешно обновлен',
}

const apiRejectMessages = {
    DEFAULT: 'Что-то пошло не так, повторите попытку позже',
    INVALID_KEY: 'Неверный ключ подтверждения',
    USER_EXISTS: 'Пользователь с таким номером уже существует',
    USER_NOT_FOUND: 'Такого пользователя не существует',
    USER_NOT_EXIST: 'Такого пользователя не существует',
}

const apiErrors = {
    INVALID_KEY: 'INVALID_KEY',
    USER_EXISTS: 'USER_EXISTS',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    USER_NOT_EXIST: 'USER_NOT_EXIST',
}

export {BASE_URL, apiRoutes, apiResponseMessages, apiRejectMessages, apiErrors}
