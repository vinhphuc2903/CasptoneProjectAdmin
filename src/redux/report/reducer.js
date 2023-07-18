import actions from './action'

const initState = {
    film: [],
    pagging: {},
    revenueByBranch: [],
    revenueByDate: {},
    revenueByOrder: {},
    revenueByFilm: {},
    error: null,
    submit: null,
}

function ReportReducer(state = initState, action) {
    const { type, error } = action
    switch (type) {
        case actions.GETTING_REPORT_BY_BRANCH:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_REPORT_BY_BRANCH_FAILSE:
            return {
                ...state,
                loading: false,
                submit: true,
            }
        case actions.GET_REPORT_BY_BRANCH_SUCCESS:
            return {
                ...state,
                revenueByBranch: action?.payload,
                status: error?.status,
                submit: false,
            }
        case actions.GETTING_REPORT_BY_DATE:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_REPORT_BY_DATE_FAILSE:
            return {
                ...state,
                loading: false,
                submit: true,
            }
        case actions.GET_REPORT_BY_DATE_SUCCESS:
            return {
                ...state,
                loading: false,
                revenueByDate: action.payload,
                status: error?.status,
                submit: false,
            }
        case actions.GETTING_REPORT_BY_FILM:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_REPORT_BY_FILM_FAILSE:
            return {
                ...state,
                loading: false,
                submit: true,
            }
        case actions.GET_REPORT_BY_FILM_SUCCESS:
            return {
                ...state,
                loading: false,
                revenueByFilm: action.payload,
                status: error?.status,
                submit: false,
            }
        case actions.GETTING_REPORT_BY_ORDER:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_REPORT_BY_ORDER_FAILSE:
            return {
                ...state,
                loading: false,
                submit: true,
            }
        case actions.GET_REPORT_BY_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                revenueByOrder: action.payload,
                status: error?.status,
                submit: false,
            }
        default:
            return {
                ...state,
            }
    }
}

export default ReportReducer;
