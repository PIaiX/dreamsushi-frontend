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

    ACCOUNT_ADDRESSES_GET: '/address/all',
    ACCOUNT_ADDRESS_GET: '/address/one/',
    ACCOUNT_ADDRESS_CREATE: '/address/create',
    ACCOUNT_ADDRESS_EDIT: '/address/edit/',
    ACCOUNT_ADDRESS_DELETE: '/address/delete',

    ACCOUNT_ORDERS_GET: '/order/all',
    ACCOUNT_ORDER_GET: '/order/one',

    ACCOUNT_NOTIFICATIONS_GET: '/notification/all',
    ACCOUNT_NOTIFICATION_DELETE: '/notification/delete',

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

    // Favorite
    FAVORITE_ALL: '/favorite',
    FAVORITE_TOGGLE: '/favorite/toggle',
    FAVORITE_SYNC: '/favorite/synchronization',

    // Admin
    ADMIN_EPR_CATEGORIES_GET: '/admin/getEprCategories',
    ADMIN_EPR_PRODUCTS_GET: '/admin/getEprProducts',
    ADMIN_EPR_ORDER_CREATE: '/admin/createEprOrder',

    ADMIN_CATEGORIES_GET: '/admin/getCategories',
    ADMIN_CATEGORY_GET: '/admin/getCategory',
    ADMIN_CATEGORY_CREATE: '/admin/createCategory',
    ADMIN_CATEGORY_EDIT: '/admin/editCategory',
    ADMIN_CATEGORY_DELETE: '/admin/deleteCategory',

    ADMIN_PRODUCTS_GET: '/admin/getProducts',
    ADMIN_PRODUCT_GET: '/admin/getProduct',
    ADMIN_PRODUCT_CREATE: '/admin/createProduct',
    ADMIN_PRODUCT_EDIT: '/admin/editProduct',
    ADMIN_PRODUCT_DELETE: '/admin/deleteProduct',

    ADMIN_SALES_GET: '/admin/getSales',
    ADMIN_SALE_GET: '/admin/getSale',
    ADMIN_SALE_CREATE: '/admin/createSale',
    ADMIN_SALE_EDIT: '/admin/editSale',
    ADMIN_SALE_DELETE: '/admin/deleteSale',

    ADMIN_ORDERS_GET: '/admin/getOrders',
    ADMIN_ORDER_GET: '/admin/getOrder',
    ADMIN_ORDER_EDIT: '/admin/editOrder',
    ADMIN_ORDER_DELETE: '/admin/deleteOrder',

    ADMIN_USERS_GET: '/admin/getUsers',
    ADMIN_USER_GET: '/admin/getUser',
    ADMIN_USER_CREATE: '/admin/createUser',
    ADMIN_USER_EDIT: '/admin/editUser',
    ADMIN_USER_DELETE: '/admin/deleteUser',

    ADMIN_NOTIFICATIONS_GET: '/admin/getNotifications',
    ADMIN_NOTIFICATION_CREATE: '/admin/createNotification',
    ADMIN_NOTIFICATION_EDIT: '/admin/editNotification',
    ADMIN_NOTIFICATION_DELETE: '/admin/deleteNotification',

    ADMIN_MARKS_GET: '/admin/getMarks',
    ADMIN_MARK_GET: '/admin/getMark',
    ADMIN_MARK_CREATE: '/admin/createMark',
    ADMIN_MARK_EDIT: '/admin/editMark',
    ADMIN_MARK_DELETE: '/admin/deleteMark',

    ADMIN_COMPLAINTS_GET: '/admin/getComplaints',
    ADMIN_COMPLAINT_GET: '/admin/getComplaint',
    ADMIN_COMPLAINT_DELETE: '/admin/deleteComplaint',
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

    // Favorite
    FAVORITE_CREATE: 'Товар добавлен в избранное',
    FAVORITE_DELETE: 'Товар удален из избранного',
    FAVORITE_SYNC: 'Список избранных обновлен',

    // Admin
    ADMIN_CATEGORY_CREATE: 'Категория успешно создана',
    ADMIN_CATEGORY_EDIT: 'Категория успешно изменена',
    ADMIN_CATEGORY_DELETE: 'Категория успешно удалена',

    ADMIN_PRODUCT_CREATE: 'Товар успешно создана',
    ADMIN_PRODUCT_EDIT: 'Товар успешно изменен',
    ADMIN_PRODUCT_DELETE: 'Товар успешно удалена',
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

export {BASE_URL, apiRoutes, apiResponseMessages, apiRejectMessages, apiErrors}
