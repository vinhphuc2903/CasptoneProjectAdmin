import ApiOperation from '../../adapter/ApiOperation';
import ApiConstants from '../../adapter/ApiConstants';

const GetListCinemaRoom = {
    getListCinemaRoom: (params) => 
        ApiOperation.request({
            url: ApiConstants.LIST_CINEMAROOM,
            method: 'GET',
            params: params,
        }),
}
const CreateCinemeRoom = {
    createCinemeRoom: (data) => 
        ApiOperation.request({
            url: ApiConstants.CREATE_CINEMAROOM,
            method: 'POST',
            data: data,
        }),
}
const DeleteCinemeRoom = {
    deleteCinemeRoom: (params) => 
        ApiOperation.request({
            url: ApiConstants.CREATE_CINEMAROOM,
            method: 'DELETE',
            params: params,
        }),
}
export { GetListCinemaRoom, CreateCinemeRoom, DeleteCinemeRoom } 

