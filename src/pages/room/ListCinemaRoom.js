import React, { useEffect, useState } from "react";
import RoomTable from "./TableRevenue/RoomTable";
import { TextLabel } from "@findxdn/erp-theme";
import { CustomDateTimePickerX, CustomAutocomplete, TextInput } from "../../components/CustomMUI/ListCustomMui";
import { useForm, Controller } from "react-hook-form";
import styles from './CinemaRoomPage.module.scss'
import Grid from '@mui/material/Grid';
import {
    Button,
  } from '@findxdn/erp-theme';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AddressAction from "../../redux/address/action";
import moment from "moment";
import CinemaRoomAction from "../../redux/cimemaroom/action";

function ListCinemaRoom()
{
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        watch,
        reset
      } = useForm();
      const dispatch = useDispatch()
    const revenueByDate = useSelector((state) => state?.Report?.revenueByDate);
    const listRoom = useSelector((state) => state?.CinemaRoom?.listCinemeRoom);
    const [listBranch, setListBranch] = useState([])
    const getBranch = () => {
        dispatch({
            type: AddressAction.GET_BRANCH,
            onSuccess: (data) => {
                setListBranch(data?.map(item=>({ key: item?.id, label: item?.name})))
            },
        })
    }
    const getRoom = (dataSubmit) => {
        dispatch({
            type: CinemaRoomAction.GET_LIST_CINEMAROOM,
            params: { BranchId: dataSubmit },
            onSuccess: (data) => {
            },
        })
    }
    const onReset = () => {
        reset({
            BranchId: null,
        });
        getRoom()
      };

    const onSubmit = (data) => {
        getRoom(data?.BranchId)
    }
    useEffect(() => {
        getBranch()
        getRoom()
    }, [])

    return (
        <div 
            className={styles.showing}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: "flex", flexDirection: "column", maxWidth: "900xp", padding: '20px' }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>Chi nhánh</TextLabel>
                        <Controller
                        control={control}
                        render={({ field: { ref, ...rest } }) => (
                            <CustomAutocomplete
                                {...rest}
                                placeholder="Chọn chi nhánh"
                                variant="outlined"
                                options={listBranch}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "300px" }}
                            />
                        )}
                        name="BranchId"
                        />
                    </Grid>
                </Grid>
                <div 
                    className="d-flex justify-content-end"
                    style={{
                        padding:'20px',
                        gap: '20px'
                    }}
                >
                    <Button
                        className="btn border-green bases__margin-right--20"
                        onClick={onReset}
                    >
                        Thiết lập lại
                    </Button>
                    <Button
                        className="btn background-green btn-search-style"
                        type="submit"
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </form>
            <RoomTable paging= {revenueByDate?.paging} data ={listRoom} tableName='Phòng chiếu' /> 
        </div>    
    )
}
export default ListCinemaRoom