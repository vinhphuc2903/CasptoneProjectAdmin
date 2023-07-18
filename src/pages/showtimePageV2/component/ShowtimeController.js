import React, { useEffect, useState } from "react";
import CustomerTable from "./TableShowtime/ShowtimeTable";
import { TextLabel } from "@findxdn/erp-theme";
import { CustomDateTimePickerX, TextInput, CustomAutocomplete } from "../../../components/CustomMUI/ListCustomMui";
import { useForm, Controller } from "react-hook-form";
import styles from './ShowtimeController.module.scss'
import Grid from '@mui/material/Grid';
import {
    Button,
  } from '@findxdn/erp-theme';
import moment from "moment";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AddressAction from "../../../redux/address/action";
// import CustomerAction from "../../../redux/customer/action"; 
import ShowtimeAction from "../../../redux/showtime/action";
import useRouter from "../../../hooks/use-router";
import CinemaRoomAction from "../../../redux/cimemaroom/action";

function ShowtimeController()
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
    const router = useRouter();
    const listShowTime = useSelector((state) => state?.Showtime?.listShowTime);
    const [listBranch, setListBranch] = useState([])
    const [listRoom, setListRoom] = useState([])

    const getAllShowtime = (dataSubmit) => {
        const datasm = {
            CurrentPage: router.get('page') ?? 1,
            PageSize: router.get('offset') ?? 50,
            ...dataSubmit
        }
        dispatch({
            type: ShowtimeAction.GET_ALL_SHOW_TIME,
            params: datasm,
            onSuccess: (data) => {
            },
        })
    }
    const getBranch = (dataSubmit) => {
        dispatch({
            type: AddressAction.GET_BRANCH,
            params: dataSubmit,
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
                setListRoom(data?.map(item=>({ key: item?.id, label: item?.name})))
            },
        })
    }
    useEffect(() => {
        getAllShowtime()
        getBranch()
    }, [])
    
    const onReset = () => {
        reset({
            CinemeRoomId: null,
            FilmName: '',
            BranchId: null,
            dateFrom: null,
            dateTo: null
        });
        getAllShowtime()
        // handleReset();
      };

    const onSubmit = (data) => {
        const dataSubmit = {
            dateFrom:   data?.DateFrom != null ? moment(data?.DateFrom).format('YYYY/MM/DD') : null,
            dateTo:  data?.DateTo != null ? moment(data?.DateTo).format('YYYY/MM/DD') : null,
            FilmName: data?.FilmName,
            BranchId: data?.BranchId,
            CinemeRoomId: data?.CinemeRoomId,
        }
        getAllShowtime(dataSubmit)
    }

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
                        <TextLabel>
                            Phim
                        </TextLabel>
                        <Controller
                            control={control}
                            render={({ field: { ref, ...rest } }) => (
                                <TextInput
                                {...rest}
                                disablePortal
                                placeholder='Nhập tên film'
                                variant="outlined"
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "100px" }}
                            />
                        )}
                        name="FilmName"
                        />
                    </Grid>
                    <Grid item xs={3} md={2} xl={3}>
                        <TextLabel>
                            Từ ngày
                        </TextLabel>
                        <Controller
                            control={control}
                            defaultValue={null}
                            render={({ field: { ref, ...rest } }) => (
                                <CustomDateTimePickerX
                                    {...rest}
                                    variant="outlined"
                                    label="DD/M/YYYY"
                                    placeholder='Chọn ngày'
                                    inputFormat="dd/MM/yyyy"
                                    InputLabelProps={{ style: { fontSize: 13, height: "40px" } }}
                                    sx={{ width: "100px", height: "40px" }}
                                />
                            )}
                            name="DateFrom"
                        />
                    </Grid>
                    <Grid item xs={3} md={2} xl={3}>
                        <TextLabel>
                            Đến ngày
                        </TextLabel>
                        <Controller
                            control={control}
                            defaultValue={null}
                            render={({ field: { ref, ...rest } }) => (
                                <CustomDateTimePickerX
                                    {...rest}
                                    variant="outlined"
                                    label="DD/M/YYYY"
                                    placeholder='Đến ngày'
                                    inputFormat="dd/MM/yyyy"
                                    InputLabelProps={{ style: { fontSize: 13, height: "40px" } }}
                                    sx={{ width: "100px", height: "40px" }}
                                />
                            )}
                            name="DateTo"
                        />
                    </Grid>
                    <Grid item xs={3} md={2} xl={3}>
                        <TextLabel>Chi nhánh</TextLabel>
                        <Controller
                        control={control}
                        render={({ field: { ref, onChange, ...rest } }) => (
                            <CustomAutocomplete
                                {...rest}
                                placeholder="Chọn chi nhánh"
                                variant="outlined"
                                options={listBranch}
                                onChange={(e) =>{
                                    getRoom(e)
                                    setValue('CinemeRoomId', null)
                                    onChange(e)
                                }}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "300px" }}
                            />
                        )}
                        name="BranchId"
                        />
                    </Grid>
                    <Grid item xs={3} md={2} xl={3}>
                        <TextLabel>Phòng chiếu</TextLabel>
                        <Controller
                        control={control}
                        render={({ field: { ref, ...rest } }) => (
                            <CustomAutocomplete
                                {...rest}
                                placeholder="Chọn phòng chiếu"
                                variant="outlined"
                                options={listRoom}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "300px" }}
                            />
                        )}
                        name="CinemeRoomId"
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
            <CustomerTable data={listShowTime?.showTimeDatas} paging={listShowTime?.paging} tableName='Danh sách lịch chiếu' /> 
        </div>    
    )
}
export default ShowtimeController