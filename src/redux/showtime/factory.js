import ApiOperation from '../../adapter/ApiOperation';
import ApiConstants from '../../adapter/ApiConstants';

const GetAllShowTime = {
    requestGetAllShowTime: (params) => 
        ApiOperation.request({
            url: ApiConstants.GET_ALL_SHOWTIME,
            method: 'GET',
            params: params,
        }),
    requestCreateShowTime: (data) => 
        ApiOperation.request({
            url: ApiConstants.CREATE_SHOWTIME,
            method: 'POST',
            data: data,
        })
}

export { GetAllShowTime } 

