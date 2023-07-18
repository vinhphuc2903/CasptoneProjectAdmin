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

export { GetListCustomer } 