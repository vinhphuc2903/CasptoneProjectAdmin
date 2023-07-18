import React, { useEffect, useState } from "react";
import { TextLabel } from "@findxdn/erp-theme";
import { CustomDateTimePickerX, CustomAutocomplete, TextInput } from "../../components/CustomMUI/ListCustomMui";
import { useForm, Controller } from "react-hook-form";
import styles from './ReportFilm.module.scss'
import Grid from '@mui/material/Grid';
import {
    Button,
  } from '@findxdn/erp-theme';
import ReportAction from "../../redux/report/action";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AddressAction from "../../redux/address/action";
import FilmAction from "../../redux/film/action";
import moment from "moment";
import FilmTable from "./TableFilm/FilmTable";

function ReportFilm()
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
    const revenueByFilm = useSelector((state) => state?.Report?.revenueByFilm);
    const listFilm = useSelector((state) => state?.Film?.film);
    const listFilmSelect = listFilm?.map(item => (
        {
            key: item?.id,
            label: item?.name
        }
    ))
    const [listBranch, setListBranch] = useState([])
    const getBranch = () => {
        dispatch({
            type: AddressAction.GET_BRANCH,
            onSuccess: (data) => {
                setListBranch(data?.map(item=>({ key: item?.id, label: item?.name})))
            },
        })
    }
    const getRevenueByFilm = (dataSubmit) => {
        dispatch({
            type: ReportAction.GET_REPORT_BY_FILM,
            params: dataSubmit,
            onSuccess: (data) => {
                //
            },
        })
    }

    const getAllFilm = () => {
        dispatch({
            type: FilmAction.GET_ALL_FILM,
            onSuccess: (data) => {
            },
        })
    }
   
    const onReset = () => {
        reset({
            FilmId: null,
            BranchId: null,
            dateFrom: null,
            dateTo: null
        });
        getRevenueByFilm()
      };

    const onSubmit = (data) => {
        const dataSubmit = {
            dateFrom: typeof data?.DateFrom != 'undefined' && data?.DateFrom != null ? moment(data?.DateFrom).format('MM/DD/YYYY') : null,
            dateTo: typeof data?.DateTo != 'undefined' && data?.DateTo != null ? moment(data?.DateTo).format('MM/DD/YYYY') : null,
            branchId: data?.BranchId,
            filmId: data?.FilmId
        }
        getRevenueByFilm(dataSubmit)
    }
    useEffect(() => {
        getRevenueByFilm()
        getBranch()
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
                        <TextLabel>Phim</TextLabel>
                        <Controller
                        control={control}
                        render={({ field: { ref, ...rest } }) => (
                            <CustomAutocomplete
                                {...rest}
                                placeholder="Chọn phim"
                                variant="outlined"
                                options={listFilmSelect}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "300px" }}
                            />
                        )}
                        name="FilmId"
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
            <FilmTable paging= {revenueByFilm?.paging} sum={revenueByFilm?.totalRevenueByDates} data ={typeof revenueByFilm?.revenueByFilms != 'undefined' ? revenueByFilm?.revenueByFilms : []} tableName='Doanh thu theo ngày/tháng' /> 
        </div>    
    )
}
export default ReportFilm