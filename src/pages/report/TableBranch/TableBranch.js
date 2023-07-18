import { Typography } from '@mui/material';
import React from 'react';
import { Box } from '@findxdn/erp-theme';
import CustomTable from "../../../components/customtable/CustomTable";
// import Pagination from 'shared/components/common/pagination/CommonPagination';
import styles from './TableBranch.module.scss';
import CustomPagination from '../../../components/pagination/CommonPagination';
import CustomTooltip from '../../../components/tooltip/CustomTooltip';
import convertStringToNumber from 'lib-pbl6';

function BranchTable(props) {
  const { loading, sum, paging, data = [], tableName } = props;

  const dataList = data?.map((item, index) => ({
    stt: index + 1,
    branchName: item?.branchName,
    branchCode: item?.branchCode,
    paymentAt:  item?.paymentAt,
    discount: convertStringToNumber(item?.discountPrice.toString()),
    revenueAfterDiscount: convertStringToNumber(item?.revenueAfterDiscount.toString()),
    revenueBeforeDiscount: convertStringToNumber(item?.revenueBeforeDiscount.toString()),
    totalFoodSold: item?.totalFoodSold,
    totalRevenueFood: convertStringToNumber(item?.totalRevenueFood.toString()),
    totalRevenueTicket: convertStringToNumber(item?.totalRevenueTicket.toString()),
    totalTicketSold: item?.totalTicketSold,
  }))
  
  const headCells = [
    {
      id: 'stt',
      label: '#',
      field: 'stt',
      minWidth: 40,
      align: 'left',
      code: '1',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.itemTable}>{children}</Typography>
      ),
    },
    {
      id: 'branchName',
      label: 'Tên chi nhánh ',
      field: 'branchName',
      minWidth: 200,
      align: 'left',
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
      id: 'branchCode',
      label: 'Mã chi nhánh ',
      field: 'branchCode',
      minWidth: 200,
      align: 'left',
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
      align: 'left',
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
      align: 'left',
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
      align: 'left',
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
      align: 'left',
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
      align: 'left',
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
      align: 'left',
      code: '7',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.itemTable}>{children}</Typography>
      ),
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
            data={dataList?? []}
            isShowCheckBox={false}
            borderTable={true}
        />
        </>
    </Box>
    <CustomPagination total={dataList?.length || 0} />
    </>
  );
}

export default BranchTable;
