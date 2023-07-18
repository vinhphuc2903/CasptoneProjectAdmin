import ApiOperation from '../../adapter/ApiOperation';
import ApiConstants from '../../adapter/ApiConstants';

const GetListCustomer = {
    requestGetListCustomer: (params) => 
        ApiOperation.request({
            url: ApiConstants.GET_ALL_CUSTOMER,
            params: params,
            method: 'GET',
        })
}

const UpdateCustomer = {
    requestUpdateCustomer: (data) => 
        ApiOperation.request({
            url: ApiConstants.UPDATE_CUSTOMER,
            data: data,
            method: 'PUT',
        })
}

const DeleteCustomer = {
    requestDeleteCustomer: (params) => 
        ApiOperation.request({
            url: ApiConstants.DELETE_CUSTOMER,
            params: params,
            method: 'DELETE',
        })
}
export { GetListCustomer, UpdateCustomer, DeleteCustomer } 