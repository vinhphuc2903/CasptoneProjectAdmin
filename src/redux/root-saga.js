/**
 * imprt libraries
 */
import { all } from 'redux-saga/effects'

/**
 * impoprt saga of other components
 */
import loginSaga from './login/saga';
import getCategory from './category/saga';
import getProduct from './product/saga';
import getCart from './cart/saga';
import getAddress from './address/saga';
import getOrder from './order/saga';
import commentSaga from './comment/saga';
import filmSaga from './film/saga';
import customerSaga from './customer/saga';
import showTimeSaga from './showtime/saga';
import cinemaRoomSaga from './cimemaroom/saga';
import reportSaga from './report/saga';

export default function* rootSaga () {
    yield all([
        loginSaga(),
        getCategory(),
        getProduct(),
        getCart(),
        getAddress(),
        getOrder(),
        commentSaga(),
        filmSaga(),
        customerSaga(),
        showTimeSaga(),
        cinemaRoomSaga(),
        reportSaga(),
    ])
}
