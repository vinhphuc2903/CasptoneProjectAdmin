/* eslint-disable jsx-a11y/alt-text */
import { IconButton } from "@mui/material";
import React from "react";
import { IconSearch, IconUser, IconShop } from "../../assets/icons/list-Icon";
import { ScShop } from "../../assets/images";
import styles from './Header.module.scss'
import { Link } from "react-router-dom";
import useRouter from "../../hooks/use-router";
import * as RouterPath from '../../router/RouterPath'
import { ImageHeader } from "../../assets/images";
import ResponsiveAppBar from "./common/HeaderMui/HeaderMui";
import MenuMain from "./common/Menu/MenuMain";

const Header = (props) => {
    const { onchange, 
        onChangeSearch = () => {}
    } = props;
    const [ isLogin, setIsLogin ] = React.useState(false);
    const router = useRouter();
    const [valueInput, setValueInput] = React.useState('');
    return (
        <div style={{ minWidth:'100%', position: 'sticky', zIndex: '100' }}>
            <ResponsiveAppBar isLogin={isLogin} />
            <MenuMain />
            {/* <div className={styles.shopOnlineHeader}>
                <IconButton
                    onClick={(e) => {
                        router.push({
                            pathname: '/',
                        })
                    }}
                    sx={{
                        borderRadius: '5px',
                    }}
                >
                    <img src={ImageHeader} height={50} style = {{ borderRadius: 10 }} />
                </IconButton>

                <div className={styles.shopInputSearch}>
                    <input 
                        className={styles.shopInput} 
                        onChange = {(e) => {
                            setValueInput(e.target.value)
                        }}
                        value={valueInput}
                        onKeyDown={(e) => {
                            if( e.key === 'Enter')
                            {
                                onChangeSearch(valueInput)
                                router.push({
                                    pathname: RouterPath.CATEGORY,
                                    params: {
                                        nCtx: valueInput,
                                    }
                                })
                            }
                        }}

                    />
                    <div style={{ marginRight: 14 }}>
                        <IconSearch />
                    </div>
                </div>
                <button 
                    className={styles.shopInput}
                    onClick={(e) => {
                        router.push({
                            pathname: RouterPath.PENDING,
                        })
                    }}
                >
                    Vé của Tôi
                </button>
                <div className={styles.shopIcon}>
                    
                    <Link to='/cart'>
                        <IconButton>
                            <IconShop />
                        </IconButton>
                    </Link>
                </div>
            </div> */}
            {/* <HeaderToolTip onchange={onchange}/> */}
        </div>
    )
}

export default Header