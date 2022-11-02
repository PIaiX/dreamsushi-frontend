const BASE_URL = process.env.REACT_APP_BASE_URL

const apiRoutes = {
    // auth
    AUTH_REGISTRATION: '/auth/registration',
    AUTH_ACTIVATE: '/auth/activate',
    AUTH_LOGIN: '/auth/login',
    AUTH_REFRESH: '/auth/refresh',
    AUTH_LOGOUT: '/auth/logout',
    AUTH_RECOVERY: '/auth/recovery',
}

const apiResponseMessages = {
    REGISTRATION: 'Вы успешно зарегистрировались и активировали свой аккаунт',
}

const apiRejectMessages = {
    DEFAULT: 'Что-то пошло не так, повторите попытку позже',
    INVALID_KEY: 'Неверный ключ подтверждения',
    USER_EXISTS: 'Пользователь с таким номером уже существует',
}

const apiErrors = {
    INVALID_KEY: 'INVALID_KEY',
    USER_EXISTS: 'USER_EXISTS',
}

export {BASE_URL, apiRoutes, apiResponseMessages, apiRejectMessages, apiErrors}
