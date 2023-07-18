/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styles from './CornWaterPage.module.scss'
import Header from "../../components/Header/Header";
import { ToastContainer } from 'react-toastify';
import ListChair from "../../components/ListChair/ListChair";
import { IconVipChair, IconSoldChair, IconDoubleChair, IconRegularChair, IconSelectedChair } from "../../assets/icons/list-Icon";
import convertStringToNumber from "lib-pbl6"
import { Button } from "@mui/material";
import FoodAndDrink from "../../components/FoodAndDrink/FoodAndDrink";
import * as RouterPath from "../../router/RouterPath"
import useRouter from "../../hooks/use-router";

function CornWaterPage(props) 
{ 
    const listData = [
        {
            id: 1,
            price: 75000,
            nameOption1: '1 bắp 22oz + 1 nước 22oz',
            nameOption2: '1 coca 22oz + 1 bắp 22oz bơ',
        },
        {
            id: 2,
            price: 100000,
            nameOption1: '1 bắp 22oz + 2 nước 22oz',
            nameOption2: '2 coca 22oz + 1 bắp 22oz bơ',
        },
        {
            id: 3,
            price: 105000,
            nameOption1: '1 bắp 30oz + 2 nước 22oz',
            nameOption2: '2 coca 22oz + 1 bắp 30oz bơ',
        },
        {
            id: 4,
            price: 80000,
            nameOption1: '1 bắp 30oz + 1 nước 22oz',
            nameOption2: '1 coca 22oz + 1 bắp 30oz bơ',
        },
        {
            id: 5,
            price: 110000,
            nameOption1: '1 bắp 30oz + 2 nước 30oz',
            nameOption2: '2 coca 30oz + 1 bắp 30oz bơ',
        },
        {
            id: 6,
            price: 85000,
            nameOption1: '1 bắp 30oz + 1 nước 30oz',
            nameOption2: '1 coca 30oz + 1 bắp 30oz bơ',
        },
        {
            id: 7,
            price: 80000,
            nameOption1: '1 bắp 30oz cacao + 1 nước 30oz',
            nameOption2: '1 coca 30oz + 1 bắp 30oz cacao',
        },
        {
            id: 8,
            price: 120000,
            nameOption1: '1 bắp 22oz cacao + 2 nước 22oz',
            nameOption2: '2 coca 22oz + 1 bắp 22oz cacao',
        },
        {
            id: 9,
            price: 120000,
            nameOption1: '1 bắp 22oz cacao + 2 nước 22oz',
            nameOption2: '2 coca 22oz + 1 bắp 22oz cacao',
        },
        {
            id: 9,
            price: 120000,
            nameOption1: '1 bắp 22oz cacao + 2 nước 22oz',
            nameOption2: '2 coca 22oz + 1 bắp 22oz cacao',
        },
    ]
    const [ total, setTotal ] = React.useState(0)
    const [ listOption, setListOption ] = React.useState([])
    const handleIncreaseTotal = (value, optionName, optionId, quantity) => {
        setTotal(total + value) 
        const item = listOption.find(item => item.Id == optionId)
        if(item)
        {
            item.Quantity++;
        } else {
            setListOption([...listOption, { Id: optionId, Name: optionName, Quantity: quantity}])
        }
    }
    const handleDecreaseTotal = (value, optionName, optionId, quantity) => {
        setTotal(total - value)
        const item = listOption.find(item => item.Id == optionId)
        if(item)
        {
            item.Quantity--;
        }
        if(item.Quantity == 0)
        {
            setListOption(listOption.filter(item => item?.Id != optionId))
        }
    }
    const router = useRouter();
    return (
        // eslint-disable-next-line no-unreachable
        <div className={styles.CornWaterPage}>
            <ToastContainer />
            <div className={styles.contentMain}>
                <Header />
                <div className={styles.choseChair}>
                    <div className={styles.chair}>
                        Bước 2: Chọn Bắp Nước
                    </div>
                    <div className={styles.foodAndDrk}>
                        {listData.map((item, index) => (
                            <FoodAndDrink 
                                item={item} 
                                handleIncreaseTotal={handleIncreaseTotal}
                                handleDecreaseTotal={handleDecreaseTotal}
                            />
                        ))}
                        <div style={{ minWidth: '340px' }}></div>
                    </div>
                </div>
            </div>
            <div
                    className={styles.footer}
                >
                    <div
                        className={styles.cairNote}
                    >
                        COMBO ĐÃ CHỌN
                        <div className={styles.listNoteChair}>
                            {listOption?.map((item) => (
                                <div className={styles.noteShow}>
                                    <div id={item?.id}>
                                        {item?.Name}
                                    </div>   
                                    <div id={item?.id}>
                                        : {item?.Quantity}
                                    </div>   
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.itemRight}>
                        <div>
                            <div>
                                THÀNH TIỀN
                                <div className={styles.textdata}>
                                    {convertStringToNumber((total).toString())} VNĐ
                                </div>
                            </div>
                        </div>
                        <div className={styles.divbutton}>
                            <Button 
                                variant="text" 
                                className={styles.buttonNext}
                                onClick={(e) => {
                                    router.push({
                                        pathname: RouterPath.CONFIRM_PAGE
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

export default CornWaterPage

