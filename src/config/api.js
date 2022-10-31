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

const apiErrors = {
    default: 'что-то пошло не так, повторите попытку',
}

export {BASE_URL, apiRoutes, apiErrors}
