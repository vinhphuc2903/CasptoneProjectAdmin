import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import useRouter from "../../../../hooks/use-router";
import * as RouterPath from "../../../../router/RouterPath";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import IconAdd from "../../../../assets/icons/ic-add";
import { IconButton, Popover } from '@mui/material';
import './HeaderMui.scss';

function HederMui(props) {
  const [dataCookies, setDataCookies] = useState(Cookies.get());
  const token = Cookies.get("tokenAdmin");
  var userLogin = useSelector((state) => state?.Login?.userLogin);
  useEffect(() => {
    setDataCookies(Cookies.get());
  }, [token]);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <AppBar position="static" style={{ minHeight: "50px", maxWidth: "100%" }}>
      <Container
        maxWidth="100%"
        sx={{ backgroundColor: "#22272b", minHeight: "50px" }}
      >
        <Toolbar
          disableGutters
          sx={{
            padding: 0,
            maxWidth: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              height: "50px",
              color: "#ffdade",
              justifyContent: "center",
              width: "30%",
              alignItems: "center",
              alignContent: "center",
              marginLeft: "2%",
            }}
          >
            <div>MOMOCHI</div>
            <div>MANAGEMENT PAGE</div>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              height: "50px",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
              marginRight: "2%",
            }}
          >
            {(dataCookies?.isLoginAdmin && typeof userLogin?.name != "undefined") && (
              <IconButton onClick={handleClick}>
                <IconAdd />
              </IconButton>
            )}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                sx={{
                    top: '6px',
                    position: -100
                }}
                disableScrollLock
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
              >
                <div 
                  style={{ padding: '16px', cursor: 'pointer' }} 
                  onClick={(e) => {
                    router.push({
                      pathname: RouterPath.CREATE_FILM,
                    });
                    handleClose()
                  }}
                  className="hover-effect"
                >
                  Tạo Phim
                </div>
                <div 
                  style={{ padding: '16px', cursor: 'pointer' }} 
                  onClick={(e) => {
                    router.push({
                      pathname: RouterPath.CREATE_SHOWTIME,
                    });
                    handleClose()
                  }}
                  className="hover-effect"
                >
                  Tạo Lịch Chiếu
                </div>
                {/* <div 
                  style={{ padding: '16px', cursor: 'pointer' }} 
                  onClick={(e) => {
                    router.push({
                      pathname: RouterPath.CREATE_SHOWTIME_V2,
                    });
                    handleClose()
                  }}
                  className="hover-effect"
                >
                  Tạo Lịch Chiếu V2
                </div> */}
                <div 
                  style={{ padding: '16px', cursor: 'pointer' }} 
                  onClick={(e) => {
                    router.push({
                      pathname: RouterPath.EMPLOYEE_CREATE,
                    });
                    handleClose()
                  }}
                  className="hover-effect"
                >
                  Tạo Nhân viên
                </div>
                <div 
                  style={{ padding: '16px', cursor: 'pointer' }} 
                  onClick={(e) => {
                    router.push({
                      pathname: RouterPath.ROOM_CREATE,
                    });
                    handleClose()
                  }}
                  className="hover-effect"
                >
                  Tạo Phòng chiếu
                </div>
              </Popover>
            {(dataCookies?.isLoginAdmin && typeof userLogin?.name != "undefined") && (
              <div
                style={{
                  color: "#D9D9D9",
                  border: "1px solid #D9D9D9",
                  width: "fitContent",
                  borderRadius: "3px",
                  padding: "0px 4px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  router.push({
                    pathname: RouterPath.ACCOUNT,
                  });
                }}
              >
                {userLogin?.name}
              </div>
            )}
            {(typeof userLogin?.name == "undefined" ||
              !dataCookies?.isLoginAdmin) && (
              <Button
                key={1}
                onClick={(e) => {
                  router.replacePage({ params: RouterPath.LOGIN });
                }}
                sx={{
                  my: 1,
                  padding: "2px 5px 2px 5px",
                  borderRadius: "3px",
                  color: "white",
                  display: "block",
                  bgcolor: "#22272b",
                  fontSize: "14",
                  textTransform: "capitalize",
                  "&:hover": {
                    bgcolor: "#bb2c2c",
                  },
                }}
              >
                Đăng nhập
              </Button>
            )}
            {/* {(typeof userLogin?.name == "undefined" ||
              !dataCookies?.isLoginAdmin) && (
              <Button
                key={2}
                onClick={(e) => {
                  // router.replacePage({ params: RouterPath.LOGIN})
                  router.push({
                    pathname: RouterPath.LOGIN,
                    params: {
                      page: 1,
                    },
                  });
                }}
                sx={{
                  my: 2,
                  padding: "2px 5px 2px 5px",
                  borderRadius: "3px",
                  color: "white",
                  display: "block",
                  bgcolor: "#22272b",
                  textTransform: "capitalize",
                  "&:hover": {
                    bgcolor: "#bb2c2c",
                  },
                }}
              >
                Đăng ký
              </Button>
            )} */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HederMui;
