/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styles from './ShowTime.module.scss'
import Header from "../../components/Header/Header";
import { useDispatch } from 'react-redux';
import ProductAction from "../../redux/product/action";
import CartAction from "../../redux/cart/action";
import Button from '@mui/material/Button';
import useRouter from "../../hooks/use-router";
import Utils from "../../utils/Utils";
import { ToastContainer } from 'react-toastify';
import convertStringToNumber from "lib-pbl6"
import { Fade } from "react-slideshow-image";
import { TextField } from "@mui/material";
import IconAvatar from "../../assets/icons/icon-avatar";
import {IconButton} from "@mui/material";
import { mesageSent } from "../../assets/images";
import CommentAction from "../../redux/comment/action";
import Footer from "../../components/Footer/Footer";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MatNaQuy } from "../../assets/images";
import * as RouterPath from "../../router/RouterPath"

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const itemShowTime = (showTime) => {
    return (
        <div
            style={{
                backgroundColor: '#dc5c5c',
                color: '#efe9e9',
                padding: '4px 6px',
                width: 'fit-content',
                borer: '1px solid white'
            }}
        >
            {showTime}
        </div>    
    )
}
const itemContent = (content) => {
    return (
        <div
            style={{
                backgroundColor: '#dc5c5c',
                color: '#efe9e9',
                padding: '4px 6px',
                borderRadius: '5px'
            }}
        >
            {content}
        </div>    
    )
}
const FilmItem = () => {
    const router = useRouter()
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                minWidth: '100%',
                fontWeight: '600',
                fontSize: '14px',
                color: '#e9ecef',
            }}
        >
            <div style={{ minWidth: '10%', maxWidth: '400px', border: '3px solid #efe9e9' }}>
                <img src={MatNaQuy} width = '100%' />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: "column",
                    minWidth: '70%',
                    margin: '20px',
                    gap: '10px'
                }}
            >
                <div style={{ 
                    fontSize: '30px', 
                    // textDecoration: 'line-through',
                    width: 'fit-content',
                    borderBottom: '3px solid #efe9e9'
                }}>
                    MẶT NẠ QUỶ (C18)
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px'
                    }}
                >
                    {itemContent("2D")}
                    {itemContent("C18")}
                </div>
                <div>
                    Kinh dị
                </div>
                <div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <div
                            style={{
                                color: '#efe9e9',
                                fontWeight: '500',
                                paddingRight: '5px'
                            }}
                        >
                            Đạo Diễn:
                        </div>
                        <div>
                            Michaela Longden, Rebecca Phillipson, Tom Millen, Victor Mellors
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <div
                            style={{
                                color: '#efe9e9',
                                fontWeight: '500',
                                paddingRight: '5px'
                            }}
                        >
                            Diễn Viên: 
                        </div>
                        <div>
                            Lawrence Fowler
                        </div>
                    </div>
                </div>
                <div>
                    Bí ẩn về cái chết của em gái Evie 20 năm trước còn bỏ ngỏ, vào lúc 09:09 hằng đêm, hàng loạt cuộc chạm trán kinh hoàng xảy ra. Liệu Margot có biết đượ...
                </div>
                <div
                    style={{
                        borderTop: '1px dotted #a29595',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '20px',
                        paddingTop: '20px'
                    }}
                >
                    <button
                        style={{
                            padding: '1px',
                            border: '5px solid #dc5c5c',
                            backgroundColor: 'white',
                            borderRadius: '2px',
                            width: 'fit-content'
                        }}
                        onClick={(e) => {
                            router.replacePage({params: RouterPath.TICKET_PAGE})
                        }}
                    >
                        {itemShowTime('15 : 15')}
                    </button>  
                    <button
                        style={{
                            padding: '1px',
                            border: '5px solid #dc5c5c',
                            backgroundColor: 'white',
                            borderRadius: '2px',
                            width: 'fit-content'
                        }}
                    >
                        {itemShowTime('18 : 15')}
                    </button>
                </div>
            </div>
        </div>    
    )
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3, padding: 0, margin: '25px 0px 25px 0px', paddingBottom: '50px' }}>
            <Typography sx={{ display: 'flex', flexDirection: 'column', gap:'50px'}}>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
const LabelCustom = (item) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    color:'#efe9e9',
                    fontFamily: 'Cemoji',
                    fontWeight: 500,
                    fontSize: '16px'
                }}
            >
                {item?.day}
            </div>
            <div
                style={{
                    fontFamily: 'Cemoji',
                    fontWeight: 500,
                    fontSize: '16px',
                    color:'#efe9e9',
                }}
            >
                {item?.dateMonth}
            </div>
        </div>    
    )
}
function ShowTime(props) 
{
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    const dispatch = useDispatch()
    const [ valueInput, setValueInput ] = React.useState("");
    const [product, setListProduct] = useState([]);
    const [comment, setComment] = useState([]);
    const getProduct = async(prdId) => {
        dispatch({
            type: ProductAction.GET_PRODUCT_BY_ID,
            data: { IdProduct: prdId },
            onSuccess: (data) => {
                setListProduct(data?.data?.result)

            },
        })
    }   
    
    const getComment = async(prdId) => {
        dispatch({
            type: CommentAction.GET_COMMENT,
            param: { idProduct: prdId },
            onSuccess: (data) => {
                setComment(data?.data?.result)
            },
        })
    }   

    // useEffect(() => {
    //     let params = { ...router.getAll() };
    //     getProduct(params?.prd)
    //     getComment(params?.prd)
    // }, [])

    var daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

    // Lấy ngày hiện tại
    var now = new Date();

    // Tạo mảng chứa 7 ngày bắt đầu từ ngày hiện tại
    var days = [];
    for (var i = 0; i < 7; i++) {
        var date = new Date(now);
        date.setDate(now.getDate() + i);
        days.push({
            day: daysOfWeek[date.getDay()],
            dateMonth: date.getDate() + '/' + date.getMonth()
        });
    }
    return (
        // eslint-disable-next-line no-unreachable
        <div className={styles.Showtime}>
            <ToastContainer />
            <div className={styles.contentMain}>
                <Header />
                <div className={styles.headerContent}>
                    <div
                        className={styles.headerMain}
                    >
                        <div className={styles.contentHeader}>
                            MOMOCHI ĐÀ NẴNG 
                        </div>
                        <div className={styles.hotLine}>
                            HOTLINE: 037.749.0754
                        </div>
                        <div className={styles.contentHeaderUnder}>
                            TRUNG TÂM GIẢI TRÍ VÀ XEM PHIM MOMOCHI Đà Nẵng Tầng 6 Tòa Nhà VNC - 72 Lê Duẫn - TP. Đà Nẵng
                        </div>
                    </div>
                    <div>
                        <Box sx={{ borderBottom: 1, borderColor: '#efe9e9' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                {days.map((item, index) => (
                                    <Tab label={LabelCustom(item)} {...a11yProps(index)} />
                                ))}
                            </Tabs>
                        </Box>
                        {days.map((item, index) => 
                            (<TabPanel value={value} index={index} sx={{ padding: 0 }}>
                                <FilmItem />
                                <FilmItem />
                                <FilmItem />
                            </TabPanel>))}
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ShowTime