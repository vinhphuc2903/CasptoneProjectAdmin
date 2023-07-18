import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { GetFilmFactory, UpdateFilmFactory, GetDetailShowTimeFactory, GetShowtimeByBranchFactory, GetTypeFilm, CreateFilmFactory, GetDetailFilm } from './factory'
import actions from './action'

export function* getShowtimeByBranchFactory() {
    yield takeEvery(actions.GET_SHOWTIME_BY_BRANCH, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetShowtimeByBranchFactory.requestGetShowtimeByBranchFactory(params))
            if (response?.status == 200) {
                yield put({
                    type: actions.GET_SHOWTIME_BY_BRANCH_SUCCESS,
                    payload: response?.data,
                });                
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

export function* getAllFilm() {
    yield takeEvery(actions.GET_ALL_FILM, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetFilmFactory.requestGetAllFilm(params))
            if (response?.status === 200) {
                onSuccess && onSuccess(response);
                yield put({
                    type: actions.GET_ALL_FILM_SUCCESS,
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

// export function* getDetailFilm() {
//     yield takeEvery(actions.GET_DETAIL_FILM, function* (payload) {
//         const { params, onSuccess, onError } = payload
//         try {
//             const response = yield call(() => GetDetailFilmFactory.requestGetDetailFilm(params))
//             if (typeof response?.filmInfos != 'undefined') {
//                 yield put({
//                     type: actions.GET_DETAIL_FILM_SUCCESS,
//                     payload: response,
//                 });                
//                 onSuccess && onSuccess(response);
//             } else {
//                 onError && onError(response?.response?.status)
//             }
//         } catch (error) {
//             console.log("err",error)
//         } finally {
//             // do something here...
//         }
//     })
// }

export function* getDetailShowTime() {
    yield takeEvery(actions.GET_DETAIL_SHOWTIME, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetDetailShowTimeFactory.requestGetDetailShowTime(params))
            if (typeof response?.showtimeData != 'undefined') {
                yield put({
                    type: actions.GET_DETAIL_SHOWTIME_SUCCESS,
                    payload: response,
                });                
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
export function* getTypeFilm() {
    yield takeEvery(actions.GET_TYPE_FILM, function* (payload) {
        const { onSuccess, onError } = payload
        try {
            const response = yield call(() => GetTypeFilm.requestGetTypeFilm())
            if ( response?.status == 200) {
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
export function* createFilm() {
    yield takeEvery(actions.CREATE_FILM, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => CreateFilmFactory.requestCreateFilm(data))
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
export function* fetDetailFilm() {
    yield takeEvery(actions.GET_DETAIL_FILM, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetDetailFilm.requestGetDetailFilm(params))
            if ( response?.status == 200) {
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

export function* updateFilm() {
    yield takeEvery(actions.UPDATE_FILM, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => UpdateFilmFactory.requestUpdateFilm(data))
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
export default function* filmSaga() {
    yield all([
        fork(getAllFilm),
        fork(getShowtimeByBranchFactory),
        fork(getDetailShowTime),
        fork(getTypeFilm),
        fork(createFilm),
        fork(fetDetailFilm),
        fork(updateFilm)
    ])
}
