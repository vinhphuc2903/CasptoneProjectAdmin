const BASE_PREFIX = '/api/1'
const AUTH_PREFIX = ''
const USER = '/users'
const CATEGORY = '/Category'
const PRODUCT = '/Product'
const ORDER = '/Order'
const ADDRESS = '/Address'
const COMMENT = '/Comment'
const ISADMIN = '/Permission'
const FILM = '/films'
const EMPLOYEE = '/employee'
const CUSTOMER = '/customer'
const SHOWTIME = '/showtime'
const CINEMAROOM ='/cinemaRoom'
const REPORT = '/report'

const ApiConstants = {
    // AUTH
    LOGIN: `${BASE_PREFIX}${AUTH_PREFIX}/login`,
    REGISTER: `${BASE_PREFIX}${AUTH_PREFIX}/login/create-user`,
    LOGOUT: `${BASE_PREFIX}${AUTH_PREFIX}/login/logout`,
    GET_USER: `${BASE_PREFIX}${AUTH_PREFIX}/users`,
    CHANGE_PROFILE: `${BASE_PREFIX}${AUTH_PREFIX}/login/update-user`,
    CHANGE_PASS: `${BASE_PREFIX}${AUTH_PREFIX}/login/update-pass`,

    //PERMISSION
    ISADMIN: `${BASE_PREFIX}${ISADMIN}/is-admin`,

    // CATEGORY
    CATEGORY: `${BASE_PREFIX}${CATEGORY}/get-list-category`,
    TREE_CATEGORY: `${BASE_PREFIX}${CATEGORY}/get-list-tree-category`,
    // PRODUCT
    LIST_PRODUCT: `${BASE_PREFIX}${PRODUCT}/find-product`,
    LIST_PRODUCT_BY_CATEGORY: `${BASE_PREFIX}${PRODUCT}/get-list-product-by-id-category`,
    ADD_PRODUCT: `${BASE_PREFIX}${PRODUCT}/add-product`,
    DELETE_PRODUCT: `${BASE_PREFIX}${PRODUCT}/delete-product-by-id`,
    GET_PRODUCT_BY_ID: `${BASE_PREFIX}${PRODUCT}/get-product-by-id`,
    GET_BEST_SELLER: `${BASE_PREFIX}${PRODUCT}/get-best-seller`,
    // ORDER
    GET_ORDER_BY_STATUS: `${BASE_PREFIX}${ORDER}/get-order-by-status`,
    GET_LIST_ORDER_BY_USERID: `${BASE_PREFIX}${ORDER}/get-order-by-userid`,
    GET_DETAIL_ORDER_BY_ID: `${BASE_PREFIX}${ORDER}/get-order-by-id`,
    GET_ORDER_BY_ID: `${BASE_PREFIX}${ORDER}/get-cart`,
    ADD_ORDER: `${BASE_PREFIX}${ORDER}/add-order`,
    CHANGE_STATUS_ORDER: `${BASE_PREFIX}${ORDER}/change-status`,

    // CART
    ADD_TO_CART: `${BASE_PREFIX}${ORDER}/add-to-cart`,
    DELETE_PRODUCT_TO_CART: `${BASE_PREFIX}${ORDER}/del-from-cart`,
    UPDATE_CART: `${BASE_PREFIX}${ORDER}/update-cart`,

    // ADDRESS
    ADD_ADDRESS: `${BASE_PREFIX}${USER}/add-address`,
    GET_PROVINCE: `${BASE_PREFIX}${USER}/province`,
    GET_DISTRICT: `${BASE_PREFIX}${USER}/district`,
    GET_COMMUNITY: `${BASE_PREFIX}${USER}/commune`,
    GET_POSITION: `${BASE_PREFIX}${USER}/position`,
    GET_BRANCH: `${BASE_PREFIX}${USER}/branch`,
    GET_LIST_ADDRESS: `${BASE_PREFIX}${USER}/get-list-address-by-user`,
    
    // FILM
    GET_ALL_FILM: `${BASE_PREFIX}${FILM}`,
    GET_DETAIL_FILM: `${BASE_PREFIX}${FILM}`,
    GET_DETAIL_SHOWTIME: `${BASE_PREFIX}${FILM}/show-time-detail`,
    GET_TYPE_FILM: `${BASE_PREFIX}${FILM}/typefilms`,
    CREATE_FILM: `${BASE_PREFIX}${FILM}`,
    DETAIL_FILM: `${BASE_PREFIX}${FILM}/admin-detail-film`,
    UPDATE_FILM: `${BASE_PREFIX}${FILM}/update-film`,
    //COMMENT
    GET_COMMENT: `${BASE_PREFIX}${COMMENT}/get-comment-by-product`,
    ADD_COMMENT: `${BASE_PREFIX}${COMMENT}/add-comment`,
    // EDIT_COMMENT: `${BASE_PREFIX}${COMMENT}/Edit Commnet`,
    DELETE_COMMENT: `${BASE_PREFIX}${COMMENT}/delete-comment`,

    //EMPLOYEE
    ALL_EMPLOYEE: `${BASE_PREFIX}${EMPLOYEE}/all-employee`,
    CREATE_EMPLOYEE: `${BASE_PREFIX}${EMPLOYEE}/create-employee`,
    UPDATE_EMPLOYEE: `${BASE_PREFIX}${EMPLOYEE}/update-employee`,
    DELETE_EMPLOYEE: `${BASE_PREFIX}${EMPLOYEE}/delete-employee`,

    //SHOWTIME
    GET_ALL_SHOWTIME: `${BASE_PREFIX}${SHOWTIME}/all-showtime`,
    CREATE_SHOWTIME: `${BASE_PREFIX}${SHOWTIME}`,
    
    //CUSTOMER
    GET_ALL_CUSTOMER: `${BASE_PREFIX}${CUSTOMER}/all-customer`,
    UPDATE_CUSTOMER: `${BASE_PREFIX}${CUSTOMER}/update-customer`,
    DELETE_CUSTOMER: `${BASE_PREFIX}${CUSTOMER}/delete-customer`,
    // GET_MESSAGE: ''

    //Create showtime
    LIST_CINEMAROOM: `${BASE_PREFIX}${CINEMAROOM}/all-cinemaRoom`,
    CREATE_CINEMAROOM: `${BASE_PREFIX}${CINEMAROOM}`,

    GET_SHOWTIME_BY_BRANCH: `${BASE_PREFIX}${FILM}/show-time-by-branch-v2`,

    //Report
    REPORT_BY_BRANCH:  `${BASE_PREFIX}${REPORT}/revenue-by-branch`,
    REPORT_BY_DATE:  `${BASE_PREFIX}${REPORT}/revenue-by-date`,
    REPORT_BY_ORDER:  `${BASE_PREFIX}${REPORT}/revenue-by-order`,
    REPORT_BY_FILM:  `${BASE_PREFIX}${REPORT}/revenue-by-film`,
}

export default ApiConstants
export { BASE_PREFIX, AUTH_PREFIX, CATEGORY, PRODUCT, ORDER, ADDRESS, COMMENT }
