import { Box } from '@mui/material'
import useTrans from '../../../../hooks/use-trans';
import { useSelector } from 'react-redux'
import styles from './DetailFilmController.module.scss'
import {
    Button,
  } from '@findxdn/erp-theme';
import moment from 'moment';
import * as RouterPath from "../../../../router/RouterPath"
import useRouter from '../../../../hooks/use-router';
import { convertNumberToString } from '../../../../utils/Utils';

export default function DetailFilmController(props) {
    const router= useRouter()
    const { data } = props
    var dataValue = {}
    if(data != null && data.length != 0)
    {
        dataValue = data
    }
    const content = (name, value, isImage = false, src="") => {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                width: '100%'
            }}>
                <div style={{ width: '40%', flex: 'left'}}>
                    {name}
                </div>
                {!isImage && <div style={{ width: '60%', flex: 'left'}}>
                    : {value}
                </div>}
                {isImage && <img src={src} width='55%' />}
            </div>    
        )
    }
    const MovieStatus = (status) => {
        let statusText;
      
        if (status === "10") {
          statusText = "Phim mới";
        } else if (status === "20") {
          statusText = "Đang chiếu";
        } else if (status === "30") {
          statusText = "Tạm hoãn";
        } else if (status === "40") {
          statusText = "Đã chiếu";
        } else {
          statusText = "Trạng thái không xác định";
        }
        return statusText
    }
    return (
        <Box
            className={styles.DetailEmployeeController}
            style={{ backgroundColor: '#fff' }}
        >
            <div>
                Thông tin chi tiết phim
            </div>
            <div 
                className={styles.infoDetail}
            >
                <div className={styles.column}>
                    {content('Tên phim', dataValue?.name)} 
                    {content('Độ tuổi giới hạn', dataValue?.ageLimit)} 
                    {content('Ngôn ngữ', dataValue?.language)} 
                    {content('Ngày phát hành', dataValue?.dateRelease != null ? moment(dataValue?.dateRelease).format('DD/MM/YYYY') : '')} 
                    {content('Ngày bắt đầu', moment(dataValue?.dateStart).format('DD/MM/YYYY'),)} 
                    {content('Ngày kết thúc', moment(dataValue?.dateEnd).format('DD/MM/YYYY'),)} 
                    {content('Giá vốn', `${convertNumberToString(dataValue?.cost)}$`)} 
                    {content('Vietsub', dataValue?.isSubtittle ? "Có" : "Không")} 
                    {content('Diễn viên', dataValue?.director)} 
                    {content('Đạo diễn', dataValue?.actor)} 
                    {content('Ảnh bìa', "", true, dataValue?.backgroundImageLink)} 
                </div>
                <div className={styles.column}>
                   
                    {content('Thời gian chiếu (Phút)', dataValue?.time)}
                    {/* {content('Trạng thái', MovieStatus(dataValue?.status))}  */}
                    {content('Đường dẫn giới thiệu', dataValue?.trailerLink)} 
                    {content('Giới thiệu', dataValue?.introduce)} 
                    {content('Ngày tạm hoãn', dataValue?.datePostpone != null ? moment(dataValue?.datePostpone).format('DD/MM/YYYY') : '',)} 
                    {content('Ngày bắt đầu lại', dataValue?.dateStartPostpone != null ? moment(dataValue?.dateStartPostpone).format('DD/MM/YYYY') : '',)}
                    {content('Ngày gia hạn', dataValue?.dateExtend != null ? moment(dataValue?.dateExtend).format('DD/MM/YYYY') : '',)}
                    {content('Lý do tạm hoãn', dataValue?.reasonPostpone)}
                    {content('Lý do tạm hoãn', dataValue.ReasonExtend)}
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
                            pathname: RouterPath.UPDATE_FILM,
                            params: {
                              code: dataValue?.id,
                            }
                        })
                    }}
                >
                    Sửa thông tin phim
                </Button>
            </div>
        </Box>
    )
}