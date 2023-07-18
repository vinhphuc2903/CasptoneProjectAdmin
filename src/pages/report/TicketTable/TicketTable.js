import { Typography } from '@mui/material';
import React from 'react';
import { Box } from '@findxdn/erp-theme';
import CustomTable from "../../../components/customtable/CustomTable";
// import Pagination from 'shared/components/common/pagination/CommonPagination';
import styles from './TicketTable.module.scss';
import CustomPagination from '../../../components/pagination/CommonPagination';
import CustomTooltip from '../../../components/tooltip/CustomTooltip';
import moment from 'moment';
import convertStringToNumber from 'lib-pbl6';
import Price from '../../../components/common/image-up-loading/price/Price';

function TicketTable(props) {
  const { loading, sum, paging, data = [], tableName } = props;

  const dataList = data?.map((item, index) => ({
    stt: index + 1,
    name: item?.name,
    orderCode: item?.orderCode,
    paymentAt:  item?.paymentAt,
    revenueAfterDiscount: convertStringToNumber(item?.revenueAfterDiscount.toString()),
    revenueBeforeDiscount: convertStringToNumber(item?.revenueBeforeDiscount.toString()),
    totalFoodSold: item?.totalFoodSold,
    totalRevenueFood: convertStringToNumber(item?.totalRevenueFood.toString()),
    totalRevenueTicket: convertStringToNumber(item?.totalRevenueTicket.toString()),
    totalTicketSold: item?.totalTicketSold,
    discount: convertStringToNumber(item?.discountPrice.toString()),
  }))
  
  const headCells = [
    {
      id: 'stt',
      label: '#',
      field: 'stt',
      minWidth: 40,
      maxWidth: 40,
      align: 'left',
      code: '1',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.itemTable}>{children}</Typography>
      ),
    },
    {
      id: 'orderCode',
      label: 'Mã đơn hàng',
      field: 'orderCode',
      minWidth: 240,
      maxWidth: 240,
      align: 'right',
      code: '3',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <CustomTooltip title={children}>
        <Typography className={styles.LineClamp}>{children}</Typography>
      </CustomTooltip>
      ),
    },
    {
      id: 'paymentAt',
      label: 'Ngày thanh toán',
      field: 'paymentAt',
      minWidth: 200,
      maxWidth: 200,
      align: 'right',
      code: '3',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <CustomTooltip title={children}>
        <Typography className={styles.LineClamp}>{children}</Typography>
      </CustomTooltip>
      ),
    },
    {
      id: 'name',
      label: 'Khách hàng',
      field: 'name',
      minWidth: 200,
      maxWidth: 200,
      align: 'right',
      code: '3',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <CustomTooltip title={children}>
        <Typography className={styles.LineClamp}>{children}</Typography>
      </CustomTooltip>
      ),
    },
    {
      id: 'totalTicketSold',
      label: 'Số vé',
      field: 'totalTicketSold',
      minWidth: 100,
      maxWidth: 100,
      align: 'right',
      code: '3',
     //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <CustomTooltip title={children}>
        <Typography className={styles.LineClamp}>{children}</Typography>
      </CustomTooltip>
      ),
    },
    {
      id: 'totalRevenueTicket',
      label: 'Doanh thu vé',
      field: 'totalRevenueTicket',
      minWidth: 200,
      maxWidth: 200,
      align: 'right',
      code: '4',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.LineClamp}>{children}</Typography>
      ),
    },
    {
      id: 'totalFoodSold',
      label: 'Số ComBo',
      field: 'totalFoodSold',
      minWidth: 120,
      maxWidth: 120,
      align: 'right',
      code: '7',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <CustomTooltip title={children}>
          <Typography className={styles.LineClamp}>{children}</Typography>
        </CustomTooltip>
      ),
    },
    {
      id: 'totalRevenueFood',
      label: 'Doanh thu combo',
      field: 'totalRevenueFood',
      minWidth: 200,
      maxWidth: 200,
      align: 'right',
      code: '7',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.itemTable}>{children}</Typography>
      ),
    },
    {
      id: 'discount',
      label: 'Chiết khấu',
      field: 'discount',
      minWidth: 200,
      maxWidth: 200,
      align: 'right',
      code: '7',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.itemTable}>{children}</Typography>
      ),
    },
    {
      id: 'revenueAfterDiscount',
      label: 'Tổng doanh thu',
      field: 'revenueAfterDiscount',
      minWidth: 200,
      maxWidth: 200,
      align: 'right',
      code: '7',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.itemTable}>{children}</Typography>
      ),
    },
  ];

  const dataRowTotal = [
    {
      width: 680,
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
    <Box className={styles.tableBonus}>
        <>
        <div className={styles.bonus}>
            <div className={styles.totalBonus}>
                {tableName}
            {/* <span>{convertNumberToString(sum?.TotalBonusValue)}</span> */}
            </div>
        </div>
        <CustomTable
            headerColumn={headCells}
            dataRowTotal={dataRowTotal}
            data={dataList?? []}
            borderTable={true}
            isShowCheckBox={false}
        />
        </>
    </Box>
    <CustomPagination total={paging?.totalRecord || 0} />
    </>
  );
}

export default TicketTable;
