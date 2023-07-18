import actions from './action'

const initState = {
    listShowTime: [],
    loading: false,
    status: null,
    error: null,
    submit: null,
}

function ShowtimeReducer(state = initState, action) {
    const { type, error } = action
    switch (type) {
        case actions.GETTING_ALL_SHOW_TIME:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_ALL_SHOW_TIME_SUCCESS:
            return {
                ...state,
                listShowTime: action.payload,
                loading: false,
                submit: true,
            }
        case actions.GET_ALL_SHOW_TIME_FAILURE:
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

export default ShowtimeReducer
