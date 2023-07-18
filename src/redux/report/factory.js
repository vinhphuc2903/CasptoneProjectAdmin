import ApiConstants from '../../adapter/ApiConstants';
import ApiOperation from '../../adapter/ApiOperation';

const GetReportByBranch = {
    requestGetReportByBranch: (param) =>
        ApiOperation.request({
            url: ApiConstants.REPORT_BY_BRANCH,
            method: 'GET',
            params: param
        }),
    }
const GetReportByDate = {
    requestGetReportByDate: (param) =>
        ApiOperation.request({
            url: ApiConstants.REPORT_BY_DATE,
            method: 'GET',
            params: param
        }),
    }
const GetReportByOrder = {
    requestGetReportByOrder: (param) =>
        ApiOperation.request({
            url: ApiConstants.REPORT_BY_ORDER,
            method: 'GET',
            params: param
        }),
    }

const GetReportByFilm = {
    requestGetReportByFilm: (param) =>
        ApiOperation.request({
            url: ApiConstants.REPORT_BY_FILM,
            method: 'GET',
            params: param
        }),
    }


export { GetReportByBranch, GetReportByDate, GetReportByOrder, GetReportByFilm }