import { Typography } from '@mui/material';
import React from 'react';
import { Box } from '@findxdn/erp-theme';
import CustomTable from '../../../../components/customtable/CustomTable';
import { convertNumberToString } from '../../../../utils/Utils';
// import Pagination from 'shared/components/common/pagination/CommonPagination';
import styles from './CustomerTable.module.scss';
import CustomPagination from '../../../../components/pagination/CommonPagination';
import CustomTooltip from '../../../../components/tooltip/CustomTooltip';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import Utils from '../../../../utils/Utils';
import getErrorMessage from '../../../../utils/ErrorConstant';
import Modal from "@mui/material/Modal";
import CustomerAction from '../../../../redux/customer/action';
import useRouter from '../../../../hooks/use-router';
import * as RouterPath from "../../../../router/RouterPath"

function CustomerTable(props) {
  const { loading, sum, paging, data, tableName } = props;
  const router = useRouter();

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
  const dataList = data?.map((item, index) => ({
    stt: index + 1,
    id: item?.id,
    phone: item?.phone,
    address: (item?.address == null && item?.provinceName == null && item?.districtName == null &&  item?.communeName == null) ? 'Đang cập nhật'
    : `${item?.address ? item?.address : ''} 
    ${item?.address && (', ' + item?.communeName)}
    ${item?.communeName && ', ' + item?.districtName}
    ${item?.communeName && ', ' + item?.provinceName}`
    ,
    name: item?.name,
    dateOfBirth: moment(item?.dateOfBirth).format('DD/MM/YYYY'),
    email: item?.email,
    point: item?.point,
    rank: item?.rank,
    gender: item?.gender == 'M' ? 'Nam' : item?.gender == 'F' ? 'Nữ' : 'Khác'
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
      id: 'name',
      label: 'Họ và tên',
      field: 'name',
      minWidth: 200,
      maxWidth: 200,
      align: 'left',
      code: '3',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children, data }) => (
        <CustomTooltip title={children}
          style={{ color: 'blue' }}
          onClick={(e) => {
            console.log('children', data)
            router.push({
                pathname: RouterPath.DETAIL_CUSTOMER,
                params: {
                    id: data?.id
                }
              })
            }
          }
        >
        <Typography className={styles.LineClamp}>{children}</Typography>
      </CustomTooltip>
      ),
    },
    {
      id: 'dateOfBirth',
      label: 'Ngày sinh',
      field: 'dateOfBirth',
      minWidth: 140,
      align: 'left',
      code: '4',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.LineClamp}>{children}</Typography>
      ),
    },
    {
      id: 'email',
      label: 'Email',
      field: 'email',
      minWidth: 220,
      maxWidth: 220,
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
      id: 'phone',
      label: 'Số điện thoại',
      field: 'phone',
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
      id: 'point',
      label: 'Điểm khách hàng',
      field: 'point',
      minWidth: 160,
      maxWidth: 160,
      align: 'left',
      code: '7',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.itemTable}>{children == null ? 0 : children}</Typography>
      ),
    },
    {
      id: 'rank',
      label: 'Hạng khách hàng',
      field: 'rank',
      minWidth: 160,
      maxWidth: 160,
      align: 'left',
      code: '7',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <Typography className={styles.itemTable}>{children == null ? 'Thành viên mới' : children}</Typography>
      ),
    },
    {
      id: 'gender',
      label: 'Giới tính',
      field: 'gender',
      minWidth: 100,
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
      id: 'address',
      label: 'Địa chỉ',
      field: 'address',
      minWidth: 300,
      align: 'left',
      code: '8',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <CustomTooltip title={children}>
          <Typography className={styles.LineClamp}>{children}</Typography>
        </CustomTooltip>
      ),
    },
    {
      id: "id",
      label: "Xóa khách hàng",
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
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState();
  const handleOnClick = (event) => {
    event.preventDefault();
    setOpen(!open);
  };
  const dispatch = useDispatch()
  const getEmployee = () => {
    dispatch({
      type: CustomerAction.GET_ALL_CUSTOMER,
      onSuccess: (data) => {
      },
    })
  }
  const deleteEmployee = () => {
    dispatch({
        type: CustomerAction.DELETE_CUSTOMER,
        params: {CustomerId: id},
        onSuccess: (data) => {
          getEmployee()
          Utils.showSuccessToast({
            message: "Xóa khách hàng thành công",
          });
      },
      onError: (data) => {
          Utils.showErrorToast({
            message:
              `Xóa khách hàng thất bại: ${getErrorMessage(data)}`,
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
              Xác nhận xóa khách hàng
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
                  deleteEmployee()
                }}
              >
                Xác nhận xóa
              </div>
            </div>
          </div>
      </Modal>
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

export default CustomerTable;
