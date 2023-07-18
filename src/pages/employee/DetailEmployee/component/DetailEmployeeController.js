import { Box } from '@mui/material'
import useTrans from '../../../../hooks/use-trans';
import { useSelector } from 'react-redux'
import styles from './DetailEmployeeController.module.scss'
import {
    Button,
  } from '@findxdn/erp-theme';
import moment from 'moment';
import * as RouterPath from "../../../../router/RouterPath"
import useRouter from '../../../../hooks/use-router';

export default function DetailEmployeeController(props) {
    const router= useRouter()
    const { data } = props
    var dataValue = {}
    if(data != null && data.length != 0)
    {
        dataValue = data[0]
    }
    const content = (name, value) => {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%'
            }}>
                <div style={{ width: '40%', flex: 'left'}}>
                    {name}
                </div>
                <div style={{ width: '60%', flex: 'left'}}>
                    : {value}
                </div>
            </div>    
        )
    }
    return (
        <Box
            className={styles.DetailEmployeeController}
            style={{ backgroundColor: '#fff' }}
        >
            <div>
                Thông tin cá nhân
            </div>
            <div 
                className={styles.infoDetail}
            >
                <div className={styles.column}>
                    {content('Tên nhân viên', dataValue?.name)} 
                    {content('Mã nhân viên', dataValue?.employeeCode)} 
                    {content('Ngày sinh', moment(dataValue?.dateOfBirth).format('DD/MM/YYYY'),)} 
                    {content('Ngày bắt đầu làm', moment(dataValue?.dateStart).format('DD/MM/YYYY'),)} 
                    {content('Giới tính', dataValue?.gender == 'M' ? 'Nam' : dataValue?.gender == 'F' ? 'Nữ' : 'Khác')} 
                    {content('Email', dataValue?.email)} 
                    {content('Số điện thoại', dataValue?.phone)} 
                </div>
                <div className={styles.column}>
                    {content('Chức vụ', dataValue?.positionName)} 
                    {content('Chi nhánh', dataValue?.branchName)} 
                    {content('Địa chỉ cụ thể', dataValue?.name)} 
                    {content('Thành phố', dataValue?.provinceName)} 
                    {content('Quận huyện', dataValue?.districtName)}
                    {content('Thị xã', dataValue?.communeName)} 
                </div>
            </div>
            <div 
                className="d-flex justify-content-end"
                style={{
                    padding:'20px',
                    gap: '20px'
                }}
            >
                <Button
                    className="btn background-green btn-search-style"
                    onClick={(e) => {
                        router.push({
                            pathname: RouterPath.EDIT_EMPLOYEE,
                            params: {
                              code: dataValue?.employeeCode,
                            }
                        })
                    }}
                >
                    Sửa thông tin nhân viên
                </Button>
            </div>
        </Box>
    )
}