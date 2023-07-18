import { Typography } from '@mui/material';
import React from 'react';
import { Box } from '@findxdn/erp-theme';
import CustomTable from '../../../../components/customtable/CustomTable';
import { convertNumberToString } from '../../../../utils/Utils';
// import Pagination from 'shared/components/common/pagination/CommonPagination';
import styles from './EmployeeTable.module.scss';
import CustomPagination from '../../../../components/pagination/CommonPagination';
import CustomTooltip from '../../../../components/tooltip/CustomTooltip';
import moment from 'moment';
import useRouter from '../../../../hooks/use-router';
import * as RouterPath from "../../../../router/RouterPath"
import Modal from "@mui/material/Modal";
import { useDispatch } from 'react-redux';
import Utils from '../../../../utils/Utils';
import getErrorMessage from '../../../../utils/ErrorConstant';
import LoginAction from '../../../../redux/login/action';

function EmployeeTable(props) {
  const { data, tableName } = props;
  const router = useRouter();

  const dataList = data?.map((item, index) => ({
    stt: index + 1,
    id: item?.id,
    name: item?.name,
    code: item?.employeeCode,
    dateStart: moment(item?.dateStart).format('DD/MM/YYYY'),
    dateOfBirth: moment(item?.dateOfBirth).format('DD/MM/YYYY'),
    branch: item?.branchName,
    position: item?.positionName,
    gender: item?.gender == 'M' ? 'Nam' : item?.gender == 'F' ? 'Nữ' : 'Khác'
  }))
  
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
        <Typography className={styles.LineClamp}>{children}</Typography>
      ),
    },
    {
      id: 'code',
      label: 'Mã nhân sự',
      field: 'code',
      minWidth: 120,
      maxWidth: 120,
      align: 'left',
      code: '2',
    //   isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
          <div 
            className={styles.LineClamp}
            onClick={(e) => {
              router.push({
                  pathname: RouterPath.DETAIL_EMPLOYEE,
                  params: {
                      code: children
                  }
                })
              }
            }
            style={{ color: 'blue' }}
          >{children}
          </div>
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
      component: ({ children }) => (
        <CustomTooltip title={children}>
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
      id: 'dateStart',
      label: 'Ngày vào làm',
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
      id: 'branch',
      label: 'Chi nhánh',
      field: 'branch',
      minWidth: 220,
      maxWidth: 220,
      align: 'left',
      code: '6',
      // isHidden: true,
      isShow: 'true',
      component: ({ children }) => (
        <CustomTooltip title={children}>
          <Typography className={styles.LineClamp}>{children}</Typography>
        </CustomTooltip>
      ),
    },
    {
      id: 'position',
      label: 'Vị trí',
      field: 'position',
      minWidth: 120,
      maxWidth: 120,
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
      id: 'gender',
      label: 'Giới tính',
      field: 'gender',
      minWidth: 160,
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
      id: "id",
      label: "Xóa nhân viên",
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
      type: LoginAction.GET_ALL_EMPLOYEE,
      onSuccess: (data) => {
      },
    })
  }
  const deleteEmployee = () => {
    dispatch({
        type: LoginAction.DELETE_EMPLOYEE,
        params: {employeeId: id},
        onSuccess: (data) => {
          getEmployee()
          Utils.showSuccessToast({
            message: "Xóa nhân viên thành công",
          });
      },
      onError: (data) => {
          Utils.showErrorToast({
            message:
              `Xóa nhân viên thất bại: ${getErrorMessage(data)}`,
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
              Xác nhận xóa nhân viên
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

export default EmployeeTable;
