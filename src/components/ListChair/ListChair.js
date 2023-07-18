import React from "react";
import styles from './ListChair.module.scss'
import { IconSoldChair, IconSelectedChair, IconRegularChair, IconVipChair, IconDoubleChair } from "../../assets/icons/list-Icon";
import { IconButton } from "@material-ui/core";
function ListChair(props)
{
    var {
        countRow, // So hang
        countCol, // So cot
        countRowChartVip,
        listChairSold, // Danh sach vi tri ghe da ban
        listChairVip, // Danh sach vi tri ghe vip
        listChairChose, // Danh sach ghe duoc chon
        listChairDouble, //Danh sach vi tri ghe double
        setListChairChose
    } = props
    countRow = 11
    countCol = 16
    countRowChartVip = 9;
    const countRowArr = Array.from({ length: countRow }, (_, i) => String.fromCharCode('A'.charCodeAt() + i));
    const countColArr = Array.from({ length: countCol }, (_, i) => i + 1);
    listChairSold = [ 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11']
    listChairVip = [ 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11']
    // listChairDouble = ['J1', 'J2', 'J3' ,'J4', 'J5', 'J6', 'J7', 'J8' ,'J9', 'J10', 'J11', 'J12', 'J13' ,'J14', 'J15', 'J16']
    // const [ listChairChose, setListChairChose] = React.useState([])
    const handleChose = (e, index) => {
        if(listChairSold.includes(index) == false && listChairChose.includes(index) == false)
        {
            setListChairChose([...listChairChose, index])
        }
        else if(listChairChose.includes(index)) {
            setListChairChose(listChairChose.filter(item => item !== index))
        }
    }
    return(
        <div className={styles.ListChair}>
            {countRowArr.map((item, index) => (
                <div className={styles.Chair}>
                    {countColArr.map((ind) => (
                            <IconButton style={{ padding: 0 }} id={`${item}${ind}`}  onClick={e => handleChose(e, `${item}${ind}`)}>{
                                listChairChose.includes(`${item}${ind}`) ? 
                                    <IconSelectedChair text={`${item}${ind}`}/> :
                                        listChairSold.includes(`${item}${ind}`) ? 
                                            <IconSoldChair text={`${item}${ind}`}/> :  
                                                listChairVip.includes(`${item}${ind}`) ?  <IconVipChair text={`${item}${ind}`}/> :
                                                    index == countRowChartVip + 1 ?  <IconDoubleChair text={`${item}${Math.round(ind/2)}`}/> : 
                                                        <IconRegularChair text={`${item}${ind}`}/>
                            }</IconButton>
                        )
                    )}
                </div>
            ))}
        </div>    
    )
}
export default ListChair;