import React, { useEffect, useState } from "react";
import RoomTable from "./TableRevenue/RoomTable";
import { TextLabel } from "@findxdn/erp-theme";
import { CustomDateTimePickerX, CustomAutocomplete, TextInput } from "../../components/CustomMUI/ListCustomMui";
import { useForm, Controller } from "react-hook-form";
import styles from './ForecastPage.module.scss'
import Grid from '@mui/material/Grid';
import {
    Button,
  } from '@findxdn/erp-theme';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AddressAction from "../../redux/address/action";
import moment from "moment";
import CinemaRoomAction from "../../redux/cimemaroom/action";
import FilmAction from "../../redux/film/action";
import Utils from "../../utils/Utils";
import * as RouterPath from "../../router/RouterPath"
import useRouter from "../../hooks/use-router";
import axios from 'axios'
import { convertNumberToString } from "../../utils/Utils";

function ForecastPageMain()
{
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        watch,
        reset
      } = useForm();
    const router= useRouter()
    const dispatch = useDispatch()
    const listFilm = useSelector((state) => state?.Film?.film);
    const listFilmSelect = listFilm?.map(item => (
        {
            key: item?.id,
            label: item?.name
        }
    ))
    // const getRoom = (dataSubmit) => {
    //     dispatch({
    //         type: CinemaRoomAction.GET_LIST_CINEMAROOM,
    //         params: { BranchId: dataSubmit },
    //         onSuccess: (data) => {
    //         },
    //     })
    // }
    const onReset = () => {
        reset({
            BranchId: null,
        });
        setData(0)
        // getRoom()
      };
    const [data, setData] = useState();
    const onSubmit = async (dataSubmit) => {
        const lfData = listFilm;
        var dataFilm = lfData.find(x => x.id == dataSubmit?.FilmId)
        if(dataFilm?.cost == null)
        {
            router.push({
                pathname: RouterPath.UPDATE_FILM,
                params: {
                  code: dataFilm?.id,
                }
            })
            Utils.showErrorToast({
                message: 'Vui lòng cập nhật giá bán và ngày phát hành để tiến hành dự đoán'
              });
        }
        // const targetDate = moment(dataFilm?.dateRelease);
        // const currentDate = moment();
        // const daysRemaining = currentDate.diff(targetDate, 'days');
        const response = await axios.get('http://127.0.0.1:8000/linear-regression', {
            params: {
                originPrice: dataFilm?.cost
            }
        });
        if(response?.status == 200)
        {
            setData(response?.data)
        }
    }
    const getAllFilm = () => {
        dispatch({
            type: FilmAction.GET_ALL_FILM,
            onSuccess: (data) => {
            },
        })
    }
    useEffect(() => {
        // getRoom()
        getAllFilm()
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
                        <TextLabel>Chọn phim<p style={{ margin: 0 }}>*</p></TextLabel>
                        <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { ref, onChange, ...rest } }) => (
                            <CustomAutocomplete
                                {...rest}
                                placeholder="Chọn phim"
                                variant="outlined"
                                onChange={(e) => {
                                    onChange(e)
                                    setData(0)
                                }}
                                options={listFilmSelect}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "300px" }}
                            />
                        )}
                        name="FilmId"
                        />
                        {errors?.FilmId?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng chọn phim!{" "}
                        </p>
                        )}
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
                        Dự đoán
                    </Button>
                </div>
            </form>
            <div className={styles.contentMain}>
                Kết quả:
            </div>
            <div 
                className={styles.infoDetail}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px'
                }}>
                    Dự đoán theo mô hình Linear Regression:  
                    <div style={{ color: 'red' }}>
                        {convertNumberToString(data)} $
                    </div>
                </div>
            </div>
        </div>    
    )
}
export default ForecastPageMain