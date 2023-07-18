import { Typography } from '@mui/material';
import React from 'react';
import { Box } from '@findxdn/erp-theme';
import CustomTable from '../../../../components/customtable/CustomTable';
import { convertNumberToString } from '../../../../utils/Utils';
// import Pagination from 'shared/components/common/pagination/CommonPagination';
import styles from './TableFilm.module.scss';
import CustomPagination from '../../../../components/pagination/CommonPagination';
import CustomTooltip from '../../../../components/tooltip/CustomTooltip';
import moment from 'moment';
import useRouter from '../../../../hooks/use-router';
import * as RouterPath from "../../../../router/RouterPath"

function TableFilm(props) {
  const { loading, dataList, sum, paging,tableName } = props;
  const router = useRouter();

  const dataListFilm = dataList?.map((item, i) => ({
    id: item?.id,
    index: i + 1,
    name: item?.name,
    time: item?.time,
    ageLimit: item?.ageLimit,
    dateStart: moment(item?.dateStart).format('DD/MM/YYYY'),
    dateEnd: moment(item?.dateEnd).format('DD/MM/YYYY'),
    listTypeFilm: item?.listTypeFilm,
    language: item?.language,
    actor: item?.actor,
    director: item?.director,
    country: item?.country,
    introduce: item?.introduce,
  }));
  const headCells = [
    {
      id: 'index',
      label: '#',
      field: 'index',
      minWidth: 40,
      maxWidth: 40,
      align: 'left',
      code: '1',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.LineClamp}>{children}</Typography>
      ),
    },
    {
      id: 'name',
      label: 'Tên Film',
      field: 'name',
      minWidth: 300,
      maxWidth: 300,
      align: 'left',
      code: '2',
    //   isHidden: true,
      isShow: 'true',
      component: (data) => {
        return (
        <CustomTooltip title={data?.children}>
          <Typography 
            className={styles.LineClamp}
            sx={{ color: 'blue' }}
            onClick={(e) => {
              router.push({
                  pathname: RouterPath.DETAIL_FILM,
                  params: {
                      code: data?.data?.id
                  }
                })
              }
            }
          >{data?.children}</Typography>
        </CustomTooltip>
      )},
    },
    {
      id: 'time',
      label: 'Thời gian chiếu',
      field: 'time',
      minWidth: 140,
      maxWidth: 140,
      align: 'left',
      code: '3',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.LineClamp}>{children} phút</Typography>
      ),
    },
    {
      id: 'ageLimit',
      label: 'Độ tuổi giới hạn',
      field: 'ageLimit',
      minWidth: 140,
      maxWidth: 140,
      align: 'left',
      code: '4',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.LineClamp}>{children}</Typography>
      ),
    },
    {
      id: 'dateStart',
      label: 'Ngày bắt đầu',
      field: 'dateStart',
      minWidth: 140,
      align: 'left',
      code: '5',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.LineClamp}>{children}</Typography>
      ),
    },
    {
      id: 'dateEnd',
      label: 'Ngày kết thúc',
      field: 'dateEnd',
      minWidth: 140,
      align: 'left',
      code: '6',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.LineClamp}>{children}</Typography>
      ),
    },
    {
      id: 'listTypeFilm',
      label: 'Thể loại',
      field: 'listTypeFilm',
      minWidth: 160,
      maxWidth: 160,
      align: 'left',
      code: '7',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <CustomTooltip title={children?.map((item, index) => {
          if( index == 0)
          {
              return `${item}`
          } else return `, ${item}`                 
        })}>
          <Typography className={styles.LineClamp}>
            {children?.map((item, index) => {
              if( index == 0)
              {
                  return `${item}`
              } else return `, ${item}`                 
            })}
          </Typography>
        </CustomTooltip>
      ),
    },
    {
      id: 'language',
      label: 'Ngôn ngữ',
      field: 'language',
      minWidth: 160,
      maxWidth: 160,
      align: 'left',
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
        id: 'actor',
        label: 'Diễn viên',
        field: 'actor',
        minWidth: 160,
        maxWidth: 160,
        align: 'left',
        code: '9',
        // isHidden: true,
        isShow: 'true',
        component: ({ children }) => (
          <CustomTooltip title={children}>
            <Typography className={styles.LineClamp}>{children}</Typography>
          </CustomTooltip>
        ),
      },
      {
        id: 'director',
        label: 'Đạo diễn',
        field: 'director',
        minWidth: 160,
        align: 'left',
        code: '10',
        // isHidden: true,
        isShow: 'true',
        component: ({ children }) => (
          <CustomTooltip title={children}>
            <Typography className={styles.LineClamp}>{children}</Typography>
          </CustomTooltip>
        ),
      },
      {
        id: 'country',
        label: 'Quốc gia',
        field: 'country',
        minWidth: 160,
        align: 'left',
        code: '11',
        // isHidden: true,
        isShow: 'true',
        component: ({ children }) => (
          <Typography className={styles.itemTable}>
            {children}
          </Typography>
        ),
      },
      {
        id: 'introduce',
        label: 'Giới thiệu',
        field: 'introduce',
        minWidth: 300,
        align: 'left',
        code: '12',
        // isHidden: true,
        isShow: 'true',
        component: ({ children }) => (
          <CustomTooltip title={children}>
            <Typography className={styles.LineClamp}>{children}</Typography>
          </CustomTooltip>
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
            data={dataListFilm ?? []}
            isShowCheckBox={false}
            borderTable={true}
        />
        </>
    </Box>
    <CustomPagination total={paging?.totalRecord || 0} />
    </>
  );
}

export default TableFilm;
