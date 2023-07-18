// import { Typography } from '@mui/material';
// import React from 'react';
// import { Box } from '@findxdn/erp-theme';
// import CustomTable from '../../../components/custom-table/CustomTable';
// // import Pagination from 'shared/components/common/pagination/CommonPagination';
// import styles from './RevenueTable.module.scss';
// import CustomPagination from '../../../components/pagination/CommonPagination';
// import CustomTooltip from '../../../components/tooltip/CustomTooltip';
// import TableCell from '@mui/material/TableCell';
// import convertStringToNumber from 'lib-pbl6';
// import TableRow from '@mui/material/TableRow';
// import { TableHead } from '@mui/material';

// function RevenueTable(props) {
//   const { loading, sum, paging, data = [], tableName } = props;

//   const dataList = data?.map((item, index) => ({
//     stt: index + 1,
//     name:  item?.name,
//     country:  item?.country,
//     paymentAt:  item?.paymentAt,
//     actor:  item?.actor,
//     status: item?.status == '10' ? "Phim mới" : item?.status == '20' ? "Đang chiếu" : item?.status == '30' ? 'Tạm hoãn' : 'Đã chiếu',
//     revenueAfterDiscount: convertStringToNumber(item?.revenueAfterDiscount.toString()),
//     revenueBeforeDiscount: convertStringToNumber(item?.revenueBeforeDiscount.toString()),
//     totalFoodSold: item?.totalFoodSold,
//     totalRevenueFood: convertStringToNumber(item?.totalRevenueFood.toString()),
//     totalRevenueTicket: convertStringToNumber(item?.totalRevenueTicket.toString()),
//     totalTicketSold: item?.totalTicketSold,
//   }))

//   const headCells = [
//     {
//       id: 'stt',
//       label: '#',
//       field: 'stt',
//       minWidth: 40,
//       align: 'left',
//       code: '1',
//     //   isHidden: true,
//       isShow: 'true',
//       component: ({ children }) => (
//         <Typography className={styles.itemTable}>{children}</Typography>
//       ),
//     },
//     {
//       id: 'paymentAt',
//       label: 'Ngày',
//       field: 'paymentAt',
//       minWidth: 150,
//       align: 'left',
//       code: '3',
//     //   isHidden: true,
//       isShow: 'true',
//       component: ({ children }) => (
//         <CustomTooltip title={children}>
//         <Typography className={styles.LineClamp}>{children}</Typography>
//       </CustomTooltip>
//       ),
//     },
//     {
//       id: 'totalTicketSold',
//       label: 'Số vé',
//       field: 'totalTicketSold',
//       minWidth: 100,
//       align: 'left',
//       code: '3',
//      //   isHidden: true,
//       isShow: 'true',
//       component: ({ children }) => (
//         <CustomTooltip title={children}>
//         <Typography className={styles.LineClamp}>{children}</Typography>
//       </CustomTooltip>
//       ),
//     },
//     {
//       id: 'totalRevenueTicket',
//       label: 'Doanh thu vé',
//       field: 'totalRevenueTicket',
//       minWidth: 200,
//       align: 'left',
//       code: '4',
//     //   isHidden: true,
//       isShow: 'true',
//       component: ({ children }) => (
//         <Typography className={styles.LineClamp}>{children}</Typography>
//       ),
//     },
//     {
//       id: 'totalFoodSold',
//       label: 'Số ComBo',
//       field: 'totalFoodSold',
//       minWidth: 120,
//       align: 'left',
//       code: '7',
//       // isHidden: true,
//       isShow: 'true',
//       component: ({ children }) => (
//         <CustomTooltip title={children}>
//           <Typography className={styles.LineClamp}>{children}</Typography>
//         </CustomTooltip>
//       ),
//     },
//     {
//       id: 'totalRevenueFood',
//       label: 'Doanh thu combo',
//       field: 'totalRevenueFood',
//       minWidth: 200,
//       align: 'left',
//       code: '7',
//       // isHidden: true,
//       isShow: 'true',
//       component: ({ children }) => (
//         <Typography className={styles.itemTable}>{children}</Typography>
//       ),
//     },
//     {
//       id: 'revenueAfterDiscount',
//       label: 'Tổng doanh thu',
//       field: 'revenueAfterDiscount',
//       minWidth: 200,
//       align: 'left',
//       code: '7',
//       // isHidden: true,
//       isShow: 'true',
//       component: ({ children }) => (
//         <Typography className={styles.itemTable}>{children}</Typography>
//       ),
//     },

//   ];
//   const dataRowTotal = [
//     {
//       value: 'Tổng ',
//       align: 'left',
//       colSpan: 7,
//       width: '760px',
//       borderRight: 'none',
//       borderLeft: '1px solid #D1D1D1',
//     },
//     {
//       value: sum?.totalTicketSold,
//       align: 'right',
//       width: '100px',
//       borderLeft: '1px solid #D1D1D1',
//     },
//     {
//       value: sum?.totalRevenueTicket,
//       align: 'right',
//       width: '160px',
//       borderLeft: '1px solid #D1D1D1',
//     },
//     {
//       value: sum?.totalFoodSold,
//       align: 'right',
//       width: '160px',
//       borderLeft: '1px solid #D1D1D1',
//     },
//     {
//       value: sum?.totalRevenueFood,
//       align: 'right',
//       width: '160px',
//       borderLeft: '1px solid #D1D1D1',
//     },
//     {
//       value: sum?.revenueAfterDiscount,
//       align: 'right',
//       width: '160px',
//       borderLeft: '1px solid #D1D1D1',
//     },
//   ];

//   return (
//     <>
//     <Box className={styles.tableBonus}>
//         <>
//         <div className={styles.bonus}>
//             <div className={styles.totalBonus}>
//                 {tableName}
//             {/* <span>{convertNumberToString(sum?.TotalBonusValue)}</span> */}
//             </div>
//         </div>
//         <CustomTable
//             headerColumn={headCells}
//             dataRowTotal={dataRowTotal}
//             data={dataList?? []}
//             isShowCheckBox={false}
//         />
//         </>
//     </Box>
//     <CustomPagination total={paging?.totalRecord || 0} />
//     </>
//   );
// }

// export default RevenueTable;

import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";
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
    id: "paymentAt",
    label: "Ngày",
    field: "paymentAt",
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
    id: "totalTicketSold",
    label: "Số vé",
    field: "totalTicketSold",
    minWidth: 100,
    maxWidth: 100,
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
    maxWidth: 200,
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
    maxWidth: 120,
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
    maxWidth: 200,
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
    maxWidth: 200,
    align: "right",
    code: "8",
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
    maxWidth: 200,
    align: "right",
    code: "8",
    isShow: "true",
    component: (props) => {
      return <Price price={props?.children} />;
    },
  },
];

const dataHeader = () => {
  return (
    <>
      <TableHead sx={{ width: '100%'}}>
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

export default function DateTable(props) {
  const { loading, sum, paging, data = [], tableName } = props;

  const dataList = data?.map((item, index) => ({
    stt: index + 1,
    name:  item?.name,
    country:  item?.country,
    paymentAt:  item?.paymentAt,
    discount: item?.discountPrice,
    actor:  item?.actor,
    status: item?.status == '10' ? "Phim mới" : item?.status == '20' ? "Đang chiếu" : item?.status == '30' ? 'Tạm hoãn' : 'Đã chiếu',
    revenueAfterDiscount: convertStringToNumber(item?.revenueAfterDiscount.toString()),
    revenueBeforeDiscount: convertStringToNumber(item?.revenueBeforeDiscount.toString()),
    totalFoodSold: item?.totalFoodSold,
    totalRevenueFood: convertStringToNumber(item?.totalRevenueFood.toString()),
    totalRevenueTicket: convertStringToNumber(item?.totalRevenueTicket.toString()),
    totalTicketSold: item?.totalTicketSold,
  }))
  const dataRowTotal = [
    {
      width: 220,
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
      <Box>
        <CustomTable
          data={dataList ?? []}
          headerColumn={headCellsData}
          dataRowTotal={dataRowTotal}
          borderTable={true}
          dataHead={dataHeader}
          topTotalRow={120}
        />
      </Box>
      {/* </WrapLoading> */}
      <CustomPagination total={paging?.totalRecord} />
    </>
  );
}
