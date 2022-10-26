const BASE_URL = process.env.REACT_APP_BASE_URL

const apiRoutes = {
    // auth
    AUTH_REGISTER: '/user/register',
    AUTH_ACTIVATE: '/user/activate',
    AUTH_LOGIN: '/user/auth',
    AUTH_REFRESH: '/user/refreshToken',
}

const apiErrors = {
    default: 'что-то пошло не так, повторите попытку',
}

export {BASE_URL, apiRoutes, apiErrors}
