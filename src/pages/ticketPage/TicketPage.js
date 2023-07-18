/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styles from './TicketPage.module.scss'
import Header from "../../components/Header/Header";
import { ToastContainer } from 'react-toastify';
import ListChair from "../../components/ListChair/ListChair";
import { IconVipChair, IconSoldChair, IconDoubleChair, IconRegularChair, IconSelectedChair } from "../../assets/icons/list-Icon";
import convertStringToNumber from "lib-pbl6"
import { Button } from "@mui/material";
import * as RouterPath from "../../router/RouterPath"
import useRouter from "../../hooks/use-router";
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';
import FilmAction from "../../redux/film/action";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";

function TicketPage(props) 
{ 
    const dispatch = useDispatch()
    const detailShow = useSelector((state) => state?.Film?.detailShow);
    console.log(detailShow)
    const [ listChairChose, setListChairChose] = React.useState([])
    const router = useRouter()
    const getDetailShowTime = async(id) => {
        dispatch({
            type: FilmAction.GET_DETAIL_SHOWTIME,
            params: id,
            onSuccess: (data) => {
                // setListProduct(data?.data?.result)
            },
        })
    }   
    useEffect(() => {
        let params = { ...router.getAll() };
        //giải mã
        const ids = AES.decrypt(params?.ids, 'ids').toString(CryptoJS.enc.Utf8);
        getDetailShowTime(ids)
    }, [])
    return (
        // eslint-disable-next-line no-unreachable
        <div className={styles.ticketPage}>
            <ToastContainer />
            <div className={styles.contentMain}>
                <Header />
                <div className={styles.choseChair}>
                    <div className={styles.chair}>
                        Bước 1: Chọn ghế
                    </div>
                    <div className={styles.screen}>
                        Màn hình
                    </div>
                    <div>
                        <ListChair listChairChose={listChairChose} setListChairChose={setListChairChose}/>
                    </div>
                </div>
            </div>
            <div
                    className={styles.footer}
                >
                    <div
                        className={styles.cairNote}
                    >
                        CHÚ THÍCH GHẾ
                        <div className={styles.listNoteChair}>
                            <div className={styles.listNoteChairLeft}>
                                <div>
                                    <IconRegularChair />
                                    : Ghế thường
                                </div>
                                <div>
                                    <IconVipChair />
                                    : Ghế vip
                                </div>
                                <div>
                                    <IconDoubleChair />
                                    : Ghế dôi
                                </div>
                            </div>
                            <div className={styles.listNoteChairRight}>
                                <div>
                                    <IconSelectedChair />
                                    : Ghế đang chọn
                                </div>
                                <div>
                                    <IconSoldChair />
                                    : Ghế đã bán
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.itemRight}>
                        <div>
                            <div>
                                GHẾ ĐÃ CHỌN
                                <div className={styles.itemChairChose}>
                                    {listChairChose.map((item, index) => (
                                        <div style={{ minWidth: '65px'}} className={styles.textdata}>
                                            {index < 1 ? item : `, ${item}` }
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                TỔNG GIÁ VÉ
                                <div className={styles.textdata}>
                                    {convertStringToNumber((listChairChose.length * 450000).toString())} VNĐ
                                </div>
                            </div>
                        </div>
                        <div className={styles.divbutton}>
                            <Button 
                                variant="text" 
                                className={styles.buttonNext}
                                onClick={(e) => {
                                    router.push({
                                        pathname: RouterPath.CORN_WATER_PAGE
                                    })
                                }}
                            >
                                Tiếp theo
                            </Button>
                        </div>
                        
                    </div>
                </div>
        </div>
    )
}

export default TicketPage

