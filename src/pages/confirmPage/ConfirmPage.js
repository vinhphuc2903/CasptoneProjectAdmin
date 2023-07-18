/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styles from './ConfirmPage.module.scss'
import Header from "../../components/Header/Header";
import { ToastContainer } from 'react-toastify';
import ListChair from "../../components/ListChair/ListChair";
import { IconVipChair, IconSoldChair, IconDoubleChair, IconRegularChair, IconSelectedChair } from "../../assets/icons/list-Icon";
import convertStringToNumber from "lib-pbl6"
import { Button } from "@mui/material";
import FoodAndDrink from "../../components/FoodAndDrink/FoodAndDrink";

function ConfirmPage(props) 
{ 
    const [timeLeft, setTimeLeft] = useState(
        localStorage.getItem('timeLeft') || 300
    );

    useEffect(() => {
        localStorage.setItem('timeLeft', timeLeft);
    }, [timeLeft]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
            setTimeLeft(timeLeft - 1);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);
    const minutes = Math.floor(timeLeft / 60);
    const secondsLeft = timeLeft % 60;

    return (
        // eslint-disable-next-line no-unreachable
        <div className={styles.ConfirmPage}>
            <ToastContainer />
            <div className={styles.contentMain}>
                <Header />
                <div className={styles.choseChair}>
                    <div className={styles.chair}>
                        Bước 3: Xác nhận thông tin
                        <div className={styles.contentdata}>
                            {minutes}:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
                        </div>
                    </div>
                    <div className={styles.foodAndDrk}>
                        <div className={styles.infoData}>
                            - Thông tin người mua
                        </div>
                        <div className={styles.detailInfoData}>
                            <div>
                                Người nhận : Đặng Văn Quang
                            </div>
                            <div>
                                Email: quangncv123@gmail.com
                            </div>
                            <div>
                                Số điện thoại: 0377490722
                            </div>
                        </div>
                    </div>
                    <div className={styles.foodAndDrk}>
                        <div className={styles.infoData}>
                            - Thông tin vé
                        </div>
                        <div className={styles.detailInfoData}>
                            <div>
                                Rạp : MOMOCHI Đà Nẵng
                            </div>
                            <div>
                                Tên phim: CON NHÓT MÓT CHỒNG
                            </div>
                            <div>
                                Suất chiếu: 23:30 - 22/04/2023
                            </div>
                            <div className={styles.chairData}>
                                SỐ GHẾ: 2
                            </div>
                            <div className={styles.numberChair}>
                                <div className={styles.chairDetail}>
                                    <div>
                                        H09: 
                                    </div>
                                    <div>
                                        70.000 đ
                                    </div>
                                </div>
                            </div>
                            <div>
                                Tổng tiền ghế: 140.000 đ
                            </div>
                        </div>
                    </div>
                    <div className={styles.foodAndDrk}>
                        <div className={styles.infoData}>
                            - Thông tin combo
                        </div>
                        <div className={styles.detailInfoData}>
                            <div>
                                Số lượng combo: 8 | Tổng tiền combo: 800.000 đ
                            </div>
                            <div>
                                Tổng tiền thanh toán: 940.000 đ
                            </div>
                        </div>
                    </div>
                    <div className={styles.foodAndDrk}>
                        <div className={styles.infoData}>
                            - Hình thức thanh toán
                        </div>
                        <div className={styles.detailInfoData}>
                            <div>
                                VN Pay
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                    className={styles.footer}
                >
                    <div
                        className={styles.cairNote}
                    >
                        {/* COMBO ĐÃ CHỌN
                        <div className={styles.listNoteChair}>
                        
                        </div> */}
                    </div>
                    <div className={styles.itemRight}>
                        <div>
                            <div>
                                THÀNH TIỀN
                                <div className={styles.textdata}>
                                    100.000 đ
                                </div>
                            </div>
                        </div>
                        <div className={styles.divbutton}>
                            <Button variant="text" className={styles.buttonNext}>
                                Tiếp theo
                            </Button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ConfirmPage

