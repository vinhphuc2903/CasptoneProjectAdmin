import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { LoginFactory, RegisterFactory, GetUserFactory, ChangeProfileFactory, ChangePasswordFactory, GetIsAdminFactory, GetListEmployee, CreateEmployeeFactory, DeleteEmployee, UpdateEmployeeFactory } from './factory'
import actions from './action'
import LoginAction from './action';
import Cookies from 'js-cookie';
import moment from 'moment';

export function* signIn() {
    yield takeEvery(actions.SUBMIT_LOGIN, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => LoginFactory.requestSignIn(data))
            if (response?.data?.code === 200) {
                Cookies.set('usernameAdmin', response?.data?.data?.Name);
                Cookies.set('tokenAdmin', response?.data?.data?.Token);
                Cookies.set('isLoginAdmin',true);
                yield put({
                    type: LoginAction.SUBMIT_LOGIN_SUCCESS,
                    payload: response,
                })
                onSuccess && onSuccess();
            } else {
                onError && onError(response?.data?.message)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}

export function* registerLogin() {
    yield takeEvery(actions.SUBMIT_REGISTER, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => RegisterFactory.requestRegister(data))
            if (response?.code === 200) {
                onSuccess && onSuccess();
            } else {
                onError && onError(response?.msgNo)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}
export function* deleteEmployee() {
    yield takeEvery(actions.DELETE_EMPLOYEE, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => DeleteEmployee.requestDeleteEmployee(params))
            if (response?.data?.code === 200) {
                onSuccess && onSuccess(response?.data);
            } else {
                console.log('response,', response)
                onError && onError(response?.data?.msgNo)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export function* getUser() {
    yield takeEvery(actions.GET_USER_DETAIL, function* (payload) {
        const { onSuccess, onError } = payload
        try {
            const response = yield call(() => GetUserFactory.requestGetUser())
            if (response?.status === 200) {
                yield put({
                    type: LoginAction.GET_USER_DETAIL_SUCCESS,
                    payload: response?.data,
                })
                onSuccess && onSuccess(response?.data);
            } else {
                onError && onError()
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export function* changeProfile() {
    yield takeEvery(actions.CHANGE_PROFILE, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            // const formData = new FormData();

            // if( data?.avatarUrl?.file  != null && typeof data?.avatarUrl?.file !== 'undefined' )
            // {
            //     formData.append('avatarUrl', data?.avatarUrl?.file)
            // }
            // else {
            //     data.avatarUrl = null
            // }
            // formData.append('birthDay', moment(data?.birthDay).format('YYYY/MM/DD'))
            // formData.append('email', data?.email)
            // formData.append('firstName', data?.firstName)
            // formData.append('gender', data?.gender)
            // formData.append('lastName', data?.lastName)
            // formData.append('phone', data?.phone)
            // formData.append('username', data?.username)

            const response = yield call(() => ChangeProfileFactory.requestChangeProfile(data))
            if (response?.data?.code === 200) {
                const cookies = Object.keys(
                    Cookies.get()); // Get an array of all cookie names
                    cookies.forEach(cookie => {
                    Cookies.remove(cookie); // Remove each cookie one by one
                });
                Cookies.set('usernameAdmin', response?.data?.data?.Username);
                Cookies.set('tokenAdmin', response?.data?.data?.Token);
                Cookies.set('isLoginAdmin',true);
                // yield put({
                //     type: LoginAction.SUBMIT_LOGIN_SUCCESS,
                //     payload: response,
                // })
                // yield call(async () => {
                //     await onSuccess(response?.data?.data?.Token);
                // });
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

export function* changePass() {
    yield takeEvery(actions.CHANGE_PASSWORD, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {            
            const response = yield call(() => ChangePasswordFactory.requestChangePassword(data))
            if (response?.data?.code === 200) {
                onSuccess && onSuccess();
                const cookies = Object.keys(
                    Cookies.get()); // Get an array of all cookie names
                    cookies.forEach(cookie => {
                    Cookies.remove(cookie); // Remove each cookie one by one
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

export function* getIsAdmin() {
    yield takeEvery(actions.ISADMIN, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {            
            const response = yield call(() => GetIsAdminFactory.requestGetIsAdmin())
            if (response?.status === 200) {
                onSuccess && onSuccess(response?.data);
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

export function* getListEmployee() {
    yield takeEvery(actions.GET_ALL_EMPLOYEE, function* (payload) {
        const { data, params, onSuccess, onError } = payload
        try {            
            const response = yield call(() => GetListEmployee.requestGetListEmployee(params))
            if (response?.status === 200) {
                yield put({
                    type: LoginAction.GET_ALL_EMPLOYEE_SUCCESS,
                    payload: response?.data,
                })
                onSuccess && onSuccess(response);
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

export function* createEmployee() {
    yield takeEvery(actions.CREATE_EMPLOYEE, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => CreateEmployeeFactory.requestCreateEmployee(data))
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


// export function* updateEmployee() {
//     yield takeEvery(actions.UPDATE_EMPLOYEE, function* (payload) {
//         const { data, onSuccess, onError } = payload
//         try {
//             const response = yield call(() => UpdateEmployeeFactory.requestUpdateEmployee(data))
//             console.log('response', response)
//             // if (response?.data?.code === 200) {
//                 onSuccess && onSuccess(response?.data);
//             // } else {
//             //     console.log(response)
//             //     onError && onError(response?.data?.msgNo)
//             // }
//         } catch (error) {
//             console.log("err",error)
//         } finally {
//             // do something here...
//         }
//     })
// }

export function* updateEmployee() {
    yield takeEvery(actions.UPDATE_EMPLOYEE, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {            
            console.log('response', data)
            const response = yield call(() => UpdateEmployeeFactory.requestUpdateEmployee(data))
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
export default function* loginSaga() {
    yield all([
        fork(signIn), 
        fork(registerLogin),
        fork(getUser),
        fork(changeProfile),
        fork(changePass),
        fork(getIsAdmin),
        fork(getListEmployee),
        fork(createEmployee),
        fork(deleteEmployee),
        fork(updateEmployee)
    ])
}
