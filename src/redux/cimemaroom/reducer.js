import actions from './action'

const initState = {
    listCinemeRoom: [],
    loading: false,
    status: null,
    error: null,
    submit: null,
}

function CinemaroomReducer(state = initState, action) {
    const { type, error } = action
    switch (type) {
        case actions.GET_LIST_CINEMAROOM_SUCCESS:
            return {
                ...state,
                listCinemeRoom: action.payload,
                loading: false,
                submit: true,
            }
        case actions.GET_CREATE_SHOW_TIME_FAILURE:
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

export default CinemaroomReducer
