import { Box } from '@mui/material'
import styles from './DetailCustomerController.module.scss'
import {
    Button,
  } from '@findxdn/erp-theme';
import moment from 'moment';
import * as RouterPath from "../../../../router/RouterPath"
import useRouter from '../../../../hooks/use-router';

export default function DetailCustomerController(props) {
    const router= useRouter()
    const { data } = props
    var dataValue = data
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
            className={styles.DetailCustomerController}
            style={{ backgroundColor: '#fff' }}
        >
            <div>
                Thông tin cá nhân
            </div>
            <div 
                className={styles.infoDetail}
            >
                <div className={styles.column}>
                    {content('Tên khách hàng', dataValue?.name)} 
                    {content('Ngày sinh', moment(dataValue?.dateOfBirth).format('DD/MM/YYYY'),)} 
                    {content('Ngày đăng ký', moment(dataValue?.dateStart).format('DD/MM/YYYY'),)} 
                    {content('Giới tính', dataValue?.gender == 'M' ? 'Nam' : dataValue?.gender == 'F' ? 'Nữ' : 'Khác')} 
                    {content('Email', dataValue?.email)} 
                    {content('Số điện thoại', dataValue?.phone)} 
                </div>
                <div className={styles.column}>
                    {content('Hạng khách hàng', dataValue?.rank ?  dataValue?.rank : 'Thành viên mới')} 
                    {content('Địa chỉ cụ thể', dataValue?.address)} 
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
                            pathname: RouterPath.EDIT_CUSTOMER,
                            params: {
                              id: dataValue?.id,
                            }
                        })
                    }}
                >
                    Sửa thông tin khách hàng
                </Button>
            </div>
        </Box>
    )
}