import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { GetAllShowTime } from './factory'
import actions from './action'

export function* getAllShowTime() {
    yield takeEvery(actions.GET_ALL_SHOW_TIME, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetAllShowTime.requestGetAllShowTime(params))
            if (response?.status === 200) {
                yield put({
                    type: actions.GET_ALL_SHOW_TIME_SUCCESS,
                    payload: response?.data,
                })
                onSuccess && onSuccess(response);
            } else {
                onError && onError(response?.data?.msgNo)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}
export function* createShowTime() {
    yield takeEvery(actions.CREATE_SHOW_TIME, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetAllShowTime.requestCreateShowTime(data))
            if (response?.data?.code === 200) {
                // yield put({
                //     type: actions.CREATE_SHOW_TIME_SUCCESS,
                //     payload: response?.data,
                // })
                onSuccess && onSuccess(response);
            } else {
                onError && onError(response?.data?.msgNo)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export default function* showTimeSaga() {
    yield all([
        fork(getAllShowTime),
        fork(createShowTime)
    ])
}
