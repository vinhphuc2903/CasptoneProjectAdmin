import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import IconUser from "../../../../assets/icons/icon-users";
import { Link } from "react-router-dom";
import useRouter from "../../../../hooks/use-router";
import { ImageHeader } from "../../../../assets/images";
import * as RouterPath from "../../../../router/RouterPath"
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function MenuMain(props) {
  const router = useRouter();
  const [dataCookies, setDataCookies] = useState(Cookies.get());
  const token = Cookies.get("tokenAdmin");
  var userLogin = useSelector((state) => state?.Login?.userLogin);
  useEffect(() => {
    setDataCookies(Cookies.get());
  }, [token]);
  
  return (
    <AppBar 
        position="static"
        style={{
            minHeight: '70px',
            maxHeight: '70px',
            margin: 0
        }}
    >
      <Container 
      maxWidth="100%"
        sx={{ 
          backgroundColor: "#e9ecef",
        }}
      >
        <Toolbar 
          disableGutters
        >
          <IconButton
            onClick={(e) => {
              router.push({
                pathname: "/",
              });
            }}
            sx={{
              marginLeft: '7%'
            }}
          >
            <img src={ImageHeader} height={50} style={{ borderRadius: 10 }} />
          </IconButton>
            <Box 
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "flex-end",
                    width: '100%',
                    marginRight: '2%',
                    height: '100%'
                }}
            >
                <Button
                    key={1}
                    onClick={(e) => {
                      router.push({
                        pathname: RouterPath.HOME
                      })
                    }}
                    sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '70px',
                        margin: '0px'
                     }}
                >
                    Trang chủ
                </Button>
                {(dataCookies?.isLoginAdmin && typeof userLogin?.name != "undefined") && (
                <Button
                    key={2}
                    onClick={(e) => {
                      router.push({
                        pathname: RouterPath.EMPLOYEE
                      })
                    }}
                    sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '70px',
                        margin: '0px'
                     }}
                >
                    Nhân viên
                </Button>)}
                {(dataCookies?.isLoginAdmin && typeof userLogin?.name != "undefined") && (
                <Button
                    key={2}
                    onClick={(e) => {
                      router.push({
                        pathname: RouterPath.CUSTOMER
                      })
                    }}
                    sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '70px',
                        margin: '0px'
                     }}
                >
                  Khách hàng
                </Button>)}
                {(dataCookies?.isLoginAdmin && typeof userLogin?.name != "undefined") && (
                  <Button
                    key={3}
                    // onClick={handleCloseNavMenu}
                    onClick={() => {
                      router.push({
                        pathname: RouterPath.FILMPAGE,
                        params: {
                          pages: 10,
                      }
                      })
                    }}
                    sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '70px',
                        margin: '0px'
                     }}
                >
                    Phim
                </Button>)}
                {(dataCookies?.isLoginAdmin && typeof userLogin?.name != "undefined") && (
                  <Button
                    key={3}
                    // onClick={handleCloseNavMenu}
                    onClick={() => {
                      router.push({
                        pathname: RouterPath.SHOWTIME
                      })
                    }}
                    sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '70px',
                        margin: '0px'
                     }}
                >
                    Lịch chiếu
                </Button>)}
                {/* {(dataCookies?.isLoginAdmin && typeof userLogin?.name != "undefined") && (
                  <Button
                    key={3}
                    // onClick={handleCloseNavMenu}
                    onClick={() => {
                      router.push({
                        pathname: RouterPath.FILMPAGE
                      })
                    }}
                    sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '70px',
                        margin: '0px'
                     }}
                >
                    Vé
                </Button>)} */}
                {(dataCookies?.isLoginAdmin && typeof userLogin?.name != "undefined") && (
                <Button
                    key={4}
                    onClick={() => {
                      router.push({
                        pathname: RouterPath.ROOM_LIST,
                      })
                    }}
                    sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '70px',
                        margin: '0px'
                     }}
                >
                    Phòng chiếu
                </Button>)}
                {(dataCookies?.isLoginAdmin && typeof userLogin?.name != "undefined") && (
                <Button
                    key={4}
                    onClick={() => {
                      router.push({
                        pathname: RouterPath.REPORT_LIST,
                        params: {
                          pages: 10
                        }
                      })
                    }}
                    sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '70px',
                        margin: '0px'
                     }}
                >
                    Báo cáo
                </Button>)}
                {/* {(dataCookies?.isLoginAdmin && typeof userLogin?.name != "undefined") && (
                <Button
                    key={4}
                    onClick={() => {
                      router.push({
                        pathname: RouterPath.FORECAST,
                      })
                    }}
                    sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '70px',
                        margin: '0px'
                     }}
                >
                    Dự đoán
                </Button>)} */}
                <Button
                    key={5}
                    onClick={() => {
                      if(Cookies.get('isLoginAdmin'))
                      {
                        router.push({
                          pathname: RouterPath.ACCOUNT
                        })
                      } else {
                        router.push({
                          pathname: RouterPath.LOGIN
                        })
                      }
                      
                    }}
                    sx={{ 
                        my: 2, 
                        color: "black", 
                        display: "block",
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#bb2c2c',
                        },
                        height: '70px',
                        margin: '0px'
                     }}
                >
                    Tài khoản
                </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MenuMain;
