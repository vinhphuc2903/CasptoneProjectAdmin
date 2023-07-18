import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { GetListCustomer, UpdateCustomer, DeleteCustomer } from './factory'
import actions from './action'
import LoginAction from './action';

export function* getListCtm() {
    yield takeEvery(actions.GET_ALL_CUSTOMER, function* (payload) {
        const { data, params, onSuccess, onError } = payload
        try {            
            const response = yield call(() => GetListCustomer.requestGetListCustomer(params))
            if (response?.status === 200) {
                yield put({
                    type: LoginAction.GET_ALL_CUSTOMER_SUCCESS,
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

export function* updateCustomer() {
    yield takeEvery(actions.UPDATE_CUSTOMER, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {            
            const response = yield call(() => UpdateCustomer.requestUpdateCustomer(data))
            console.log('response', response)
            if (response?.data?.code === 200) {
                onSuccess && onSuccess();
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
export function* deleteCustomer() {
    yield takeEvery(actions.DELETE_CUSTOMER, function* (payload) {
        const { data, params, onSuccess, onError } = payload
        try {            
            const response = yield call(() => DeleteCustomer.requestDeleteCustomer(params))
            if (response?.data?.code === 200) {
                onSuccess && onSuccess();
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
export default function* customerSaga() {
    yield all([
        fork(getListCtm), 
        fork(deleteCustomer),
        fork(updateCustomer)
    ])
}
