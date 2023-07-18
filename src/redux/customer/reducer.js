import actions from './action'

const initState = {
    userLogin: [],
    listCustomer: [],
    loading: false,
    status: null,
    error: null,
    submit: null,
}

function CustomerReducer(state = initState, action) {
    const { type, error } = action
    switch (type) {
        case actions.GETTING_ALL_CUSTOMER:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_ALL_CUSTOMER_SUCCESS:
            return {
                ...state,
                listCustomer: action?.payload,
                loading: false,
                submit: true,
            }
        case actions.GET_CUSTOMER_DETAIL_FAILUSE:
            return {
                ...state,
                loading: false,
                status: error?.status,
                submit: false,
            }
        default:
            return {
                ...state,
            }
    }
}

export default CustomerReducer
