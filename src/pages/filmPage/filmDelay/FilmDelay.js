import React from "react";
import TableFilm from "../components/TableFilm/TableFilm";
import { TextLabel } from "@findxdn/erp-theme";
import { CustomDateTimePickerX, TextInput, CustomAutocomplete } from "../../../components/CustomMUI/ListCustomMui";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import styles from './FilmDelay.module.scss'
import Grid from '@mui/material/Grid';
import {
    Button,
  } from '@findxdn/erp-theme';

function FilmDelay(props)
{
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        watch,
        reset
      } = useForm();
    const {
        listFilm,
        listType,
        getAllFilm
    } = props
    const listTypeFilm = listType?.map(item => ({
        key: item.id,
        label: item.name,
    }))
    const onSubmit = (data) => {
        const dataSubmit = {
            dateFrom:   data?.dateFrom != null ? moment(data?.dateFrom).format('YYYY/MM/DD') : null,
            dateTo:  data?.dateTo != null ? moment(data?.dateTo).format('YYYY/MM/DD') : null,
            type: data?.type,
            name: data?.name,
        }
        getAllFilm(dataSubmit)
    }
    const onReset = () => {
        reset({
          name: '',
          dateFrom: null,
          dateTo: null,
          type: null
        });
        // handleReset();
      };
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
                            Tên Film
                        </TextLabel>
                        <Controller
                            control={control}
                            render={({ field: { ref, ...rest } }) => (
                                <TextInput
                                {...rest}
                                maxLength={100}
                                disablePortal
                                placeholder='Nhập tên film'
                                variant="outlined"
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "100px" }}
                                />
                            )}
                            name="name"
                        />
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Ngày bắt đầu từ
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
                        name="dateFrom"
                        />
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Ngày bắt đầu đến
                        </TextLabel>
                        <Controller
                            control={control}
                            defaultValue={null}
                            render={({ field: { ref, ...rest } }) => (
                                <CustomDateTimePickerX
                                    {...rest}
                                    variant="outlined"
                                    label="DD/M/YYYY"
                                    inputFormat="dd/MM/yyyy"
                                    placeholder='Chọn ngày'
                                    InputLabelProps={{ style: { fontSize: 13, height: "40px" } }}
                                    sx={{ width: "100px", height: "40px" }}
                                />
                            )}
                            name="dateTo"
                        />
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>Thể loại</TextLabel>
                        <Controller
                        control={control}
                        render={({ field: { ref, ...rest } }) => (
                            <CustomAutocomplete
                                {...rest}
                                placeholder="Chọn thể loại"
                                variant="outlined"
                                options={listTypeFilm}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "300px" }}
                            />
                        )}
                        name="type"
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
            <TableFilm dataList={listFilm?.film} paging={listFilm?.paging} tableName='Danh sách phim tạm hoãn'/> 
        </div>    
    )
}
export default FilmDelay