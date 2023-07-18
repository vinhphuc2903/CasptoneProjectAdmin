import ApiOperation from '../../adapter/ApiOperation';
import ApiConstants from '../../adapter/ApiConstants';

const LoginFactory = {
    requestSignIn: (data) =>
        ApiOperation.request({
            url: ApiConstants.LOGIN,
            method: 'POST',
            data: data
        })
}

const RegisterFactory = {
    requestRegister: (data) => 
        ApiOperation.request({
            url: ApiConstants.REGISTER,
            method: 'POST',
            data: data
        })
}

const GetUserFactory = {
    requestGetUser: () => 
        ApiOperation.request({
            url: ApiConstants.GET_USER,
            method: 'GET',
        })
}

const ChangeProfileFactory = {
    requestChangeProfile: (data) => 
        ApiOperation.request({
            url: ApiConstants.CHANGE_PROFILE,
            method: 'PUT',
            data: data,
        })
}

const ChangePasswordFactory = {
    requestChangePassword: (data) => 
        ApiOperation.request({
            url: ApiConstants.CHANGE_PASS,
            method: 'PUT',
            data: data,
        })
}

const GetIsAdminFactory = {
    requestGetIsAdmin: (data) => 
        ApiOperation.request({
            url: ApiConstants.ISADMIN,
            method: 'GET',
        })
}
const GetListEmployee = {
    requestGetListEmployee: (params) => 
        ApiOperation.request({
            url: ApiConstants.ALL_EMPLOYEE,
            params: params,
            method: 'GET',
        })
}
const DeleteEmployee = {
    requestDeleteEmployee: (params) => 
        ApiOperation.request({
            url: ApiConstants.DELETE_EMPLOYEE,
            params: params,
            method: 'DELETE',
        })
}
const CreateEmployeeFactory = {
    requestCreateEmployee: (data) => 
        ApiOperation.request({
            url: ApiConstants.CREATE_EMPLOYEE,
            method: 'POST',
            data: data
        })
}

const UpdateEmployeeFactory = {
    requestUpdateEmployee: (data) => 
        ApiOperation.request({
            url: ApiConstants.UPDATE_EMPLOYEE,
            data: data,
            method: 'PUT',
        })
}

export { LoginFactory, RegisterFactory, GetUserFactory, ChangeProfileFactory, ChangePasswordFactory, GetIsAdminFactory, GetListEmployee, CreateEmployeeFactory, DeleteEmployee, UpdateEmployeeFactory } 