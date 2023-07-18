

import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Typography } from '@mui/material';
import convertStringToNumber from "lib-pbl6";
import { Box } from "@findxdn/erp-theme";
import CustomTable from "../../../components/customtable/CustomTable";
import Price from "../../../components/common/image-up-loading/price/Price";
import CustomPagination from "../../../components/pagination/CommonPagination";
// import Pagination from 'shared/components/common/pagination/CommonPagination';
// import styles from './RevenueTable.module.scss';
import CustomTooltip from "../../../components/tooltip/CustomTooltip";

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
let headCellsData = [
  {
    id: "STT",
    numeric: "1",
    disablePadding: false,
    label: "#",
    minWidth: 70,
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
    numeric: "2",
    disablePadding: false,
    label: "Tên phim",
    minWidth: 200,
    code: "1",
    field: "name",
    align: "left",
    sort: false,
    component: (props) => {
      return <TextComponent>{props?.children}</TextComponent>;
    },
    isOnclick: true,
  },
  {
    id: "EmployeeName",
    numeric: "2",
    disablePadding: false,
    label: "Tên nhân viên",
    minWidth: 200,
    code: "1",
    field: "EmployeeName",
    align: "left",
    sort: false,
    component: (props) => {
      return <TextComponent>{props?.children}</TextComponent>;
    },
  },
  {
    id: "country",
    label: "Đất nước ",
    field: "country",
    minWidth: 120,
    align: "left",
    code: "3",
    isShow: "true",
    component: (props) => {
      return <TextComponent>{props?.children}</TextComponent>;
    },
  },
  {
    id: "dateStart",
    label: "Ngày bắt đầu",
    field: "dateStart",
    minWidth: 150,
    align: "left",
    code: "3",
    isShow: "true",
    component: (props) => {
      return <TextComponent>{props?.children}</TextComponent>;
    },
  },
  {
    id: "dateEnd",
    label: "Ngày kết thúc",
    field: "dateEnd",
    minWidth: 150,
    align: "left",
    code: "3",
    isShow: "true",
    component: (props) => {
      return <TextComponent>{props?.children}</TextComponent>;
    },
  },
  {
    id: "status",
    label: "Trạng thái",
    field: "status",
    minWidth: 120,
    align: "left",
    code: "3",
    isShow: "true",
    component: (props) => {
      return <TextComponent>{props?.children}</TextComponent>;
    },
  },
  {
    id: "totalTicketSold",
    label: "Số vé",
    field: "totalTicketSold",
    minWidth: 100,
    align: "right",
    code: "3",
    isShow: "true",
    component: (props) => {
      return <Price price={props?.children} />;
    },
  },
  {
    id: "totalRevenueTicket",
    label: "Doanh thu vé",
    field: "totalRevenueTicket",
    minWidth: 200,
    align: "right",
    code: "4",
    isShow: "true",
    component: (props) => {
      return <Price price={props?.children} />;
    },
  },
  {
    id: "totalFoodSold",
    label: "Số ComBo",
    field: "totalFoodSold",
    minWidth: 120,
    align: "right",
    code: "7",
    isShow: "true",
    component: (props) => {
      return <Price price={props?.children} />;
    },
  },
  {
    id: "totalRevenueFood",
    label: "Doanh thu combo",
    field: "totalRevenueFood",
    minWidth: 200,
    align: "right",
    code: "7",
    isShow: "true",
    component: (props) => {
      return <Price price={props?.children} />;
    },
  },
  {
    id: "discount",
    label: "Chiết khấu",
    field: "discount",
    minWidth: 200,
    align: "right",
    code: "7",
    isShow: "true",
    component: (props) => {
      return <Price price={props?.children} />;
    },
  },
  {
    id: "revenueAfterDiscount",
    label: "Tổng doanh thu",
    field: "revenueAfterDiscount",
    minWidth: 200,
    align: "right",
    code: "7",
    isShow: "true",
    component: (props) => {
      return <Price price={props?.children} />;
    },
  },
];

const dataHeader = () => {
  return (
    <>
      <TableHead>
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
            Tên phim
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
            Tên nhân viên
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
            Đất nước
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
            Ngày bắt đầu
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
            Ngày kết thúc
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
            Trạng thái
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
              textAlign: "center",
            }}
            sx={[
              {
                borderRight: "1px solid rgb(209 209 209 / 78%)",
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
            Số Combo
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
            Doanh thu combo
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
            Chiết khấu
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

export default function FilmTable(props) {
  const { loading, sum, paging, data = [], tableName } = props;

  const dataList = data?.map((item, index) => ({
    stt: index + 1,
    name: item?.name,
    country: item?.country,
    dateStart: item?.dateStart,
    dateEnd: item?.dateEnd,
    actor: item?.actor,
    status:
      item?.status == "10"
        ? "Phim mới"
        : item?.status == "20"
        ? "Đang chiếu"
        : item?.status == "30"
        ? "Tạm hoãn"
        : "Đã chiếu",
    discount: item?.discountPrice,
    revenueAfterDiscount: item?.revenueAfterDiscount,
    revenueBeforeDiscount: item?.revenueBeforeDiscount,
    totalFoodSold: item?.totalFoodSold,
    totalRevenueFood: item?.totalRevenueFood,
    totalRevenueTicket: item?.totalRevenueTicket,
    totalTicketSold: item?.totalTicketSold,
  }));
  const dataRowTotal = [
    {
      width: 1010,
      value: "Tổng",
      align: "left",
    },
    {
      width: 100,
      value: <Price price={props?.sum?.totalTicketSold} />,
      align: "right",
    },
    {
      width: 200,
      value: <Price price={props?.sum?.totalRevenueTicket} />,
      align: "right",
    },
    {
      width: 120,
      value: <Price price={props?.sum?.totalFoodSold} />,
      align: "right",
    },
    {
      width: 200,
      value: <Price price={props?.sum?.totalRevenueFood} />,
      align: "right",
    },
    {
      width: 200,
      value: <Price price={props?.sum?.discountPrice} />,
      align: "right",
    },
    {
      width: 200,
      value: <Price price={props?.sum?.revenueAfterDiscount} />,
      align: "right",
    },
  ];

  return (
    <>
      {/* <FormSearchHistory region={props?.region} branch={props?.branch} />
            <WrapLoading
                loading={props?.loading && props?.data?.length == 0}
                Loader={() => (
                    <div style={{ marginTop: '5px' }}>
                        <ProductTableLoader />
                    </div>
                )}
            > */}
      <Box>
        <CustomTable
          data={dataList ?? []}
          headerColumn={headCellsData}
          dataRowTotal={dataRowTotal}
          borderTable={true}
          dataHeaderCustom={dataHeader}
          topTotalRow={120}
        />
      </Box>
      {/* </WrapLoading> */}
      <CustomPagination total={paging?.totalRecord} />
    </>
  );
}
