import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { GetReportByBranch, GetReportByDate, GetReportByOrder, GetReportByFilm } from './factory'
import actions from './action'

export function* getReportByBranch() {
    yield takeEvery(actions.GET_REPORT_BY_BRANCH, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetReportByBranch.requestGetReportByBranch(params))
            if (response?.status === 200) {
                onSuccess && onSuccess(response);
                yield put({
                    type: actions.GET_REPORT_BY_BRANCH_SUCCESS,
                    payload: response?.data,
                });
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

export function* getReportByDate() {
    yield takeEvery(actions.GET_REPORT_BY_DATE, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetReportByDate.requestGetReportByDate(params))
            if (response?.status === 200) {
                onSuccess && onSuccess(response);
                yield put({
                    type: actions.GET_REPORT_BY_DATE_SUCCESS,
                    payload: response?.data,
                });
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

export function* getReportByOrder() {
    yield takeEvery(actions.GET_REPORT_BY_ORDER, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetReportByOrder.requestGetReportByOrder(params))
            if (response?.status === 200) {
                onSuccess && onSuccess(response);
                yield put({
                    type: actions.GET_REPORT_BY_ORDER_SUCCESS,
                    payload: response?.data,
                });
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

export function* getReportByFilm() {
    yield takeEvery(actions.GET_REPORT_BY_FILM, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetReportByFilm.requestGetReportByFilm(params))
            if (response?.status === 200) {
                onSuccess && onSuccess(response);
                yield put({
                    type: actions.GET_REPORT_BY_FILM_SUCCESS,
                    payload: response?.data,
                });
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

export default function* reportSaga() {
    yield all([
        fork(getReportByBranch),
        fork(getReportByDate),
        fork(getReportByOrder),
        fork(getReportByFilm),
    ])
}
