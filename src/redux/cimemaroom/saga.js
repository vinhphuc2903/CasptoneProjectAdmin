import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { GetListCinemaRoom, CreateCinemeRoom, DeleteCinemeRoom } from './factory'
import CinemaRoomAction from './action'

export function* getListCinemaRoom() {
    yield takeEvery(CinemaRoomAction.GET_LIST_CINEMAROOM, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetListCinemaRoom.getListCinemaRoom(params))
            console.log(response)
            if (response?.status === 200) {
                yield put({
                    type: CinemaRoomAction.GET_LIST_CINEMAROOM_SUCCESS,
                    payload: response?.data,
                })
                onSuccess && onSuccess(response?.data);
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

export function* createCinemeRoom() {
    yield takeEvery(CinemaRoomAction.CREATE_CINEMAROOM, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => CreateCinemeRoom.createCinemeRoom(data))
            if (response?.data?.code === 200) {
                onSuccess && onSuccess(response?.data);
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
export function* deleteCinemeRoom() {
    yield takeEvery(CinemaRoomAction.DELETE_CINEMAROOM, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => DeleteCinemeRoom.deleteCinemeRoom(params))
            console.log(response)
            if (response?.data?.code === 200) {
                onSuccess && onSuccess(response?.data);
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

export default function* cinemaRoomSaga() {
    yield all([
        fork(getListCinemaRoom),
        fork(createCinemeRoom),
        fork(deleteCinemeRoom)
    ])
}
