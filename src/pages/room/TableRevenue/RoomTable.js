import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";
import convertStringToNumber from "lib-pbl6";
import { Box } from "@findxdn/erp-theme";
import CustomTable from "../../../components/customtable/CustomTable";
import Price from "../../../components/common/image-up-loading/price/Price";
import CustomPagination from "../../../components/pagination/CommonPagination";
import Modal from "@mui/material/Modal";
import { useDispatch } from 'react-redux';
import CinemaRoomAction from "../../../redux/cimemaroom/action";
import Utils from "../../../utils/Utils";
import getErrorMessage from "../../../utils/ErrorConstant";

const TextComponent = (props) => {
  return (
    <Typography
      className="text-truncate"
      style={{
        fontSize: "14px",
        lineHeight: "20px",
        color: `${props?.color || "#333333"}`,
      }}
    >
      {props?.children}
    </Typography>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  height: '200px',
  padding: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  flexDirection: 'column',
  color: "black",
  bgcolor: "white",
  backgroundColor: "white",
  border: "0.5px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RoomTable(props) {
  const { loading, sum, paging, data = [], tableName } = props;
  const [id, setId] = React.useState();
  const [open, setOpen] = React.useState(false);
  const handleOnClick = (event) => {
    event.preventDefault();
    setOpen(!open);
  };
  const dataList = data?.map((item, index) => ({
    id: item?.id,
    stt: index + 1,
    name: item?.name,
    totalColumn: item?.totalColumn,
    totalRow: item?.totalRow,
    totalSeat: item?.totalSeat,
    branchName: item?.branchName,
  }));
  let headCellsData = [
    {
      id: "STT",
      numeric: "1",
      disablePadding: false,
      label: "#",
      minWidth: 70,
      maxWidth: 70,
      code: "1",
      field: "STT",
      align: "center",
      sort: false,
      component: (props) => {
        return props?.stt + 1;
      },
    },
    {
      id: "name",
      label: "Tên phòng chiếu",
      field: "name",
      minWidth: 150,
      maxWidth: 150,
      align: "right",
      code: "2",
      isShow: "true",
      component: (props) => {
        return <TextComponent>{props?.children}</TextComponent>;
      },
    },
    {
      id: "totalRow",
      label: "Số hàng ghế",
      field: "totalRow",
      minWidth: 120,
      maxWidth: 120,
      align: "right",
      code: "3",
      isShow: "true",
      component: (props) => {
        return <Price price={props?.children} />;
      },
    },
    {
      id: "totalColumn",
      label: "Số cột ghế",
      field: "totalColumn",
      minWidth: 120,
      maxWidth: 120,
      align: "right",
      code: "4",
      isShow: "true",
      component: (props) => {
        return <Price price={props?.children} />;
      },
    },
    {
      id: "totalSeat",
      label: "Số chỗ ngồi",
      field: "totalSeat",
      minWidth: 120,
      maxWidth: 120,
      align: "right",
      code: "7",
      isShow: "true",
      component: (props) => {
        return <Price price={props?.children} />;
      },
    },
    {
      id: "branchName",
      label: "Chi nhánh",
      field: "branchName",
      minWidth: 220,
      maxWidth: 220,
      align: "right",
      code: "7",
      isShow: "true",
      component: (props) => {
        return <TextComponent>{props?.children}</TextComponent>;
      },
    },
    {
      id: "id",
      label: "Xóa phòng chiếu",
      field: "id",
      minWidth: 140,
      maxWidth: 140,
      align: "center",
      code: "7",
      isShow: "true",
      component: (props) => {
        return (
          <div
            style={{
              cursor: "pointer",
              color: "white",
              backgroundColor: "red",
              padding: "5px 10px",
              borderRadius: "3px",
              fontSize: "14px",
            }}
            onClick={(e) => {
              handleOnClick(e)
              setId(props?.children)
            }}
          >
            Xóa
          </div>
        );
      },
    },
  ];

  const dataHeader = () => {
    return (
      <>
        <TableHead sx={{ width: "100%" }}>
          <TableRow>
            <TableCell
              style={{
                minWidth: 70,
                borderRight: "1px solid rgb(209 209 209 / 78%)",
                borderLeft: "1px solid rgb(209 209 209 / 78%)",
              }}
              sx={[
                {
                  padding: "6px 5px",
                  textAlign: "center",
                  backgroundColor: "whitesmoke",
                },
              ]}
              rowSpan={2}
            >
              #
            </TableCell>
            <TableCell
              style={{
                minWidth: 150,
                borderRight: "1px solid rgb(209 209 209 / 78%)",
              }}
              sx={[
                {
                  padding: "6px 5px",
                  textAlign: "center",
                  backgroundColor: "whitesmoke",
                },
              ]}
              rowSpan={2}
            >
              Ngày
            </TableCell>
            <TableCell
              style={{
                minWidth: 100,
                borderRight: "1px solid rgb(209 209 209 / 78%)",
              }}
              sx={[
                {
                  padding: "6px 5px",
                  textAlign: "center",
                  backgroundColor: "whitesmoke",
                },
              ]}
              rowSpan={2}
            >
              Số vé
            </TableCell>
            <TableCell
              style={{
                minWidth: 200,
                borderRight: "1px solid rgb(209 209 209 / 78%)",
              }}
              sx={[
                {
                  padding: "6px 5px",
                  textAlign: "center",
                  backgroundColor: "whitesmoke",
                },
              ]}
              rowSpan={2}
            >
              Doanh thu vé
            </TableCell>
            <TableCell
              style={{
                minWidth: 120,
                borderRight: "1px solid rgb(209 209 209 / 78%)",
              }}
              sx={[
                {
                  padding: "6px 5px",
                  textAlign: "center",
                  backgroundColor: "whitesmoke",
                },
              ]}
              rowSpan={2}
            >
              Số ComBo
            </TableCell>
            <TableCell
              style={{
                minWidth: 200,
                borderRight: "1px solid rgb(209 209 209 / 78%)",
              }}
              sx={[
                {
                  padding: "6px 5px",
                  textAlign: "center",
                  backgroundColor: "whitesmoke",
                },
              ]}
              rowSpan={2}
            >
              Doanh thu ComBo
            </TableCell>
            <TableCell
              style={{
                minWidth: 200,
                borderRight: "1px solid rgb(209 209 209 / 78%)",
              }}
              sx={[
                {
                  padding: "6px 5px",
                  textAlign: "center",
                  backgroundColor: "whitesmoke",
                },
              ]}
              rowSpan={2}
            >
              Tổng doanh thu
            </TableCell>
          </TableRow>
        </TableHead>
      </>
    );
  };
  const dispatch = useDispatch()
  const getRoom = () => {
    dispatch({
        type: CinemaRoomAction.GET_LIST_CINEMAROOM,
        onSuccess: (data) => {
        },
    })
}
  const deleteCinemeRoom = () => {
    dispatch({
        type: CinemaRoomAction.DELETE_CINEMAROOM,
        params: {id: id},
        onSuccess: (data) => {
          getRoom()
          Utils.showSuccessToast({
            message: "Xóa phòng chiếu thành công",
          });
      },
      onError: (data) => {
          Utils.showErrorToast({
            message:
              `Xóa phòng chiếu thất bại: ${getErrorMessage(data)}`,
          });
        },
    })
}
  return (
    <>
      <Modal
        open={open}
        onClose={handleOnClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ padding: 0 }}
      >
        <div style={style} padding={0}>
          <div>
            Xác nhận xóa phòng chiếu
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', height: '30px'}}>
            <div
              style={{
                cursor: "pointer",
                color: "white",
                backgroundColor: "#138300",
                borderRadius: "3px",
                fontSize: "14px",
                width: '100px',
                padding: '5px'
              }}
              onClick={(e) => handleOnClick(e)}
            >
              Quay trở lại
            </div>
            <div
              style={{
                cursor: "pointer",
                color: "white",
                backgroundColor: "red",
                borderRadius: "3px",
                fontSize: "14px",
                width: '100px',
                padding: '5px'
              }}
              onClick={(e) => {
                handleOnClick(e)
                deleteCinemeRoom()
              }}
            >
              Xác nhận xóa
            </div>
          </div>
        </div>
      </Modal>
      <Box>
        <CustomTable
          data={dataList ?? []}
          headerColumn={headCellsData}
          borderTable={true}
          dataHead={dataHeader}
          topTotalRow={120}
        />
      </Box>
      {/* </WrapLoading> */}
      <CustomPagination total={dataList?.length} />
    </>
  );
}
