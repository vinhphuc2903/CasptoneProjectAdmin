import { Typography } from '@mui/material';
import React from 'react';
import { Box } from '@findxdn/erp-theme';
import CustomTable from '../../../../components/custom-table/CustomTable';
import { convertNumberToString } from '../../../../utils/Utils';
// import Pagination from 'shared/components/common/pagination/CommonPagination';
import styles from './ShowtimeTable.module.scss';
import CustomPagination from '../../../../components/pagination/CommonPagination';
import CustomTooltip from '../../../../components/tooltip/CustomTooltip';
import moment from 'moment';

function ShowtimeTable(props) {
  const { loading, sum, paging, data, tableName } = props;

  const dataList = data?.map((item, index) => ({
    stt: index + 1,
    dateShow:  moment(item?.dateShow).format('DD/MM/YYYY'),
    branchName: item?.branchName,
    filmName: item?.filmName,
    from: `${item?.fromHour}:${item?.fromMinus}`,
    to: `${item?.toHour}:${item?.toMinus}`,
    showtimeCode: item?.showtimeCode,
    showtimeName: item?.showtimeName,
    totalTicket: item?.totalTicket,
    totalTicketRemain: item?.totalTicketRemain,
    totalTicketSold: item?.totalTicketSold,
    cinemeRoom: item?.cinemeRoom,
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
      id: 'dateShow',
      label: 'Ngày chiếu',
      field: 'dateShow',
      minWidth: 120,
      maxWidth: 120,
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
      id: 'showtimeCode',
      label: 'Mã suất chiếu',
      field: 'showtimeCode',
      minWidth: 130,
      maxWidth: 130,
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
      id: 'showtimeName',
      label: 'Tên suất chiếu',
      field: 'showtimeName',
      minWidth: 130,
      maxWidth: 130,
      align: 'left',
      code: '4',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.LineClamp}>{children}</Typography>
      ),
    },
    {
      id: 'filmName',
      label: 'Tên film',
      field: 'filmName',
      minWidth: 200,
      maxWidth: 200,
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
      id: 'branchName',
      label: 'Chi nhánh',
      field: 'branchName',
      minWidth: 200,
      maxWidth: 200,
      align: 'left',
      code: '7',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.itemTable}>{children}</Typography>
      ),
    },
    {
      id: 'cinemeRoom',
      label: 'Phòng chiếu',
      field: 'cinemeRoom',
      minWidth: 120,
      maxWidth: 120,
      align: 'left',
      code: '7',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.itemTable}>{children}</Typography>
      ),
    },
    {
      id: 'from',
      label: 'Từ giờ',
      field: 'from',
      minWidth: 100,
      maxWidth: 100,
      align: 'right',
      code: '8',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.itemTable}>
          {children}
        </Typography>
      ),
    },
    {
      id: 'to',
      label: 'Đến giờ',
      field: 'to',
      minWidth: 100,
      maxWidth: 100,
      align: 'right',
      code: '8',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.itemTable}>
          {children}
        </Typography>
      ),
    },
    {
      id: 'totalTicket',
      label: 'Số vé',
      field: 'totalTicket',
      minWidth: 100,
      align: 'right',
      code: '8',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.itemTable}>
          {children}
        </Typography>
      ),
    },
    {
      id: 'totalTicketSold',
      label: 'Số vé đã bán',
      field: 'totalTicketSold',
      minWidth: 120,
      align: 'right',
      code: '8',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.itemTable}>
          {children}
        </Typography>
      ),
    },
    {
      id: 'totalTicketRemain',
      label: 'Số vé còn lại',
      field: 'totalTicketRemain',
      minWidth: 120,
      align: 'right',
      code: '8',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.itemTable}>
          {children}
        </Typography>
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
        />
        </>
    </Box>
    <CustomPagination total={paging?.totalRecord || 0} />
    </>
  );
}

export default ShowtimeTable;
