import ApiConstants from '../../adapter/ApiConstants';
import ApiOperation from '../../adapter/ApiOperation';

const GetFilmFactory = {
    requestGetAllFilm: (param) =>
        ApiOperation.request({
            url: ApiConstants.GET_ALL_FILM,
            method: 'GET',
            params: param
        }),
    }
const GetDetailFilmFactory = {
    requestGetDetailFilm: (param) =>
        ApiOperation.fetchSingle(
            ApiConstants.GET_DETAIL_FILM,
            param
        ),
    }
const GetDetailShowTimeFactory = {
    requestGetDetailShowTime: (param) =>
        ApiOperation.fetchSingle(
            ApiConstants.GET_DETAIL_SHOWTIME,
            param
        ),
    }

const GetTypeFilm = {
    requestGetTypeFilm: () =>
        ApiOperation.request({
            url: ApiConstants.GET_TYPE_FILM,
            method: 'GET',
        }),
    }

const CreateFilmFactory = {
    requestCreateFilm: (data) => 
        ApiOperation.request({
            url: ApiConstants.CREATE_FILM,
            method: 'POST',
            data: data
        })
    }
const GetDetailFilm = {
    requestGetDetailFilm: (params) =>
        ApiOperation.request({
            url: ApiConstants.DETAIL_FILM,
            method: 'GET',
            params: params
        }),
    }
const UpdateFilmFactory = {
    requestUpdateFilm: (data) => 
        ApiOperation.request({
            url: ApiConstants.UPDATE_FILM,
            method: 'PUT',
            data: data
        })
    }
const GetShowtimeByBranchFactory = {
    requestGetShowtimeByBranchFactory: (params) =>
        ApiOperation.request({
            url: ApiConstants.GET_SHOWTIME_BY_BRANCH,
            method: 'GET',
            params: params
        }),
    }
export { GetShowtimeByBranchFactory, GetFilmFactory, GetDetailFilmFactory, GetDetailShowTimeFactory, GetTypeFilm, CreateFilmFactory, GetDetailFilm, UpdateFilmFactory }