import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { GetListCustomer } from './factory'
import actions from './action'
import LoginAction from './action';
import Cookies from 'js-cookie';
import moment from 'moment';



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
                onSuccess && onSuccess();
            } else {
                onError && onError(response?.data?.message)
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
    ])
}
