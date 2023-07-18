import React from "react";
import * as RouterPath from './RouterPath'
import Category from "../pages/category/Category";
import Login from "../pages/login/Login";
import DetailLaptop from "../pages/DetailLaptop/DetailLaptop";
import Cart from "../pages/cart/Cart"
import AccountInfo from "../pages/account/AccountInfo";
import Admin from "../pages/admin/MyProduct/Admin"
import Payment from "../pages/payment/Payment";
import Pending from "../pages/pending/Pending";
import HomePage from "../pages/homepage/HomePage";
import DetailOrder from "../pages/detailOrder/DetailOrder";
import EditProduct from "../components/Admin/EditProduct/EditProduct";
import PageNull from "../redux/pagenull/pagenull";
import ChangePass from "../pages/changepass/ChangePass";
// import ShowTime from "../pages/showTime/ShowTime";
// import DetailFilm from "../pages/detailFilm/DetailFilm";
import ListFilmPlaying from "../pages/listFilmPlaying/ListFilmPlaying";
import TicketPage from "../pages/ticketPage/TicketPage";
import CornWaterPage from "../pages/cornWaterPage/CornWaterPage";
import ConfirmPage from "../pages/confirmPage/ConfirmPage";
import Employee from "../pages/employee/Employee";
import FilmPage from "../pages/filmPage/FilmPage";
import Customer from "../pages/customer/Customer";
import CreateEmployee from "../pages/employee/CreateEmployee/CreateEmployee";
import DetailEmployee from "../pages/employee/DetailEmployee/DetailEmployee";
import EditEmployee from "../pages/employee/EditEmployee/EditEmployee";
import Showtime from "../pages/showtimePage/Showtime";
import CreateShowtime from "../pages/showtimePage/CreateShowtime/CreateShowtime";
import Reportage from "../pages/report/ReportList";
import CreateFilm from "../pages/createFilm/CreateFilm";
import DetailFilm from "../pages/filmPage/filmDetail/DetailFilm";
import UpdateFilm from "../pages/updateFilm/UpdateFilm";
import RoomPage from "../pages/room/CinemaRoomPage";
import CreateRoom from "../pages/createRoom/CreateRoom";
import ForecastPage from "../pages/forecast/ForecastPage";
import CreateShowtimeV2 from "../pages/showtimePageV2/CreateShowtime/CreateShowtime";
import EditCustomer from "../pages/customer/EditCustomer/EditCustomer";
import DetailCustomer from "../pages/customer/DetailCustomer/DetailCustomer";
import Change from "../pages/change/change";

const Routes = [
    {
      id: 'HOME',
      path: RouterPath.HOMEPAGE,
      component: <HomePage />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'CATEGORY',
      path: RouterPath.CATEGORY,
      component: <Category />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'LOGIN',
      path: RouterPath.LOGIN,
      component: <Login />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'DETAIL_LAPTOP',
      path: RouterPath.DETAIL_LAPTOP,
      component: <DetailLaptop />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'CART',
      path: RouterPath.CART,
      component: <Cart />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'ACCOUNTINFO',
      path: RouterPath.ACCOUNT,
      component: <AccountInfo />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'ADMIN',
      path: RouterPath.ADMIN,
      component: <Admin />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'PAYMENT',
      path: RouterPath.PAYMENT,
      component: <Payment />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'PENDING',
      path: RouterPath.PENDING,
      component: <Pending />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'DETAIL_ORDER',
      path: RouterPath.DETAIL_ORDER,
      component: <DetailOrder />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'EDIT_PRODUCT',
      path: RouterPath.EDIT_PRODUCT,
      component: <EditProduct />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'PAGE_NULL',
      path: RouterPath.PAGE_NULL,
      component: <PageNull />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'CHANGE_PASS',
      path: RouterPath.CHANGE_PASSWORD,
      component: <Change />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    // {
    //   id: 'SHOWTIMES',
    //   path: RouterPath.SHOWTIMES,
    //   component: <ShowTime />,
    //   // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    // },
    // {
    //   id: 'DETAIL_FILM',
    //   path: RouterPath.DETAIL_FILM,
    //   component: <DetailFilm />,
    //   // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    // },
    {
      id: 'FILMS_PLAYING',
      path: RouterPath.FILMS_PLAYING,
      component: <ListFilmPlaying />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'TICKET_PAGE',
      path: RouterPath.TICKET_PAGE,
      component: <TicketPage />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'CORN_WATER_PAGE',
      path: RouterPath.CORN_WATER_PAGE,
      component: <CornWaterPage />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'CONFIRM_PAGE',
      path: RouterPath.CONFIRM_PAGE,
      component: <ConfirmPage />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'EMPLOYEE',
      path: RouterPath.EMPLOYEE,
      component: <Employee />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'FILMPAGE',
      path: RouterPath.FILMPAGE,
      component: <FilmPage />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'CUSTOMER',
      path: RouterPath.CUSTOMER,
      component: <Customer />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'EMPLOYEE_CREATE',
      path: RouterPath.EMPLOYEE_CREATE,
      component: <CreateEmployee />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'DETAIL_EMPLOYEE',
      path: RouterPath.DETAIL_EMPLOYEE,
      component: <DetailEmployee />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'EDIT_EMPLOYEE',
      path: RouterPath.EDIT_EMPLOYEE,
      component: <EditEmployee />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'SHOWTIME',
      path: RouterPath.SHOWTIME,
      component: <Showtime />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'CREATE_SHOWTIME',
      path: RouterPath.CREATE_SHOWTIME,
      component: <CreateShowtime />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'REPORT_LIST',
      path: RouterPath.REPORT_LIST,
      component: <Reportage />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'ROOM_LIST',
      path: RouterPath.ROOM_LIST,
      component: <RoomPage />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'CREATE_FILM',
      path: RouterPath.CREATE_FILM,
      component: <CreateFilm />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'DETAIL_FILM',
      path: RouterPath.DETAIL_FILM,
      component: <DetailFilm />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'UPDATE_FILM',
      path: RouterPath.UPDATE_FILM,
      component: <UpdateFilm />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'ROOM_CREATE',
      path: RouterPath.ROOM_CREATE,
      component: <CreateRoom />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'FORECAST',
      path: RouterPath.FORECAST,
      component: <ForecastPage />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'CREATE_SHOWTIME_V2',
      path: RouterPath.CREATE_SHOWTIME_V2,
      component: <CreateShowtimeV2 />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'EDIT_CUSTOMER',
      path: RouterPath.EDIT_CUSTOMER,
      component: <EditCustomer />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'DETAIL_CUSTOMER',
      path: RouterPath.DETAIL_CUSTOMER,
      component: <DetailCustomer />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
]
export default Routes
