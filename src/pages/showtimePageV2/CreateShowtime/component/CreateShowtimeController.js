import React, { useEffect, useState } from "react";
import { TextLabel } from "@findxdn/erp-theme";
import { CustomDateTimePickerX, TextInput, CustomAutocomplete, CustomTimepicker } from "../../../../components/CustomMUI/ListCustomMui";
// import { CustomDateTimePickerX } from "../../../../components/CustomMUI/ListCustomMui";
import { useForm, Controller } from "react-hook-form";
import styles from './CreateShowtimeController.module.scss'
import Grid from '@mui/material/Grid';
import {
    Button,
  } from '@findxdn/erp-theme';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LoginAction from "../../../../redux/login/action";
import AddressAction from "../../../../redux/address/action";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Utils from "../../../../utils/Utils";
import * as RouterPath from "../../../../router/RouterPath"
import useRouter from "../../../../hooks/use-router";
import getErrorMessage from "../../../../utils/ErrorConstant";
import FilmAction from "../../../../redux/film/action";
import CinemaRoomAction from "../../../../redux/cimemaroom/action";
import ShowtimeAction from "../../../../redux/showtime/action";
import moment from "moment";
import IconAdd from "../../../../assets/icons/ic-add";
import IconAddProduct from "../../../../assets/icons/icon-addproduct";
import IconDelete from "../../../../assets/icons/icon-delete";
import { IconButton } from "@mui/material";
import ShowtimeEmpty from "./ShowtimeEmpty";
import IconSearch from "../../../../assets/icons/icon-search";

function CreateShowtimeController()
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
    const ChoooseShowRoom = useSelector((state)=> state.CreateShowTime)
    const [listBranch, setListBranch] = useState([])
    const [listRoom, setListRoom] = useState([])


    const listFilm = useSelector((state) => state?.Film);
    const filmData = listFilm?.film?.map(item => (
        {
            key: item?.id,
            label: item?.name
        }));
    
    const getAllFilm = async(dataSearch = {}) => {
        var status = 20
        const dataSubmit = {
          Status: status,
        }
        dispatch({
            type: FilmAction.GET_ALL_FILM,
            params: dataSubmit,
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
        getAllFilm()
        getBranch()
    }, [])
    const [listRoomFilm, setListroomFilm] = useState([]) 
    const onReset = () => {
        reset({
          name: '',
          branch: null,
          position: null,
          dateStart: null
        });
        // getAllEmployee()
        // handleReset();
      };
    const createShowTime = (data) => {
        dispatch({
            type: ShowtimeAction.CREATE_SHOW_TIME,
            data: data,
            onSuccess: (data) => {
                Utils.showSuccessToast({
                  message: "Tạo lịch chiếu thành công",
                });
                router.push({
                  pathname: RouterPath.SHOWTIME,
                 
              })
            },
            onError: (data) => {
                console.log(data)
                Utils.showErrorToast({
                  message:
                    `Tạo lịch chiếu thất bại: ${getErrorMessage(data)}`,
                });
              },
        })
    }
    const onSubmit = (data) => {
        const date = new Date(data.dateFrom);
        const utcDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        const formattedDate = utcDate.toISOString();
        const dateTo = new Date(data.dateTo);
        const utcDatTo = new Date(dateTo.getTime() - (dateTo.getTimezoneOffset() * 60000));
        const formattedDateTo = utcDatTo.toISOString();
        const dataSubmmit = {
            BranchId: data?.BranchId,
            countShow: data?.countShow,
            dateFrom: formattedDate,
            dateTo: formattedDateTo,
            idFilm: data?.idFilm,
            idRoom: data?.idRoom,
            minOff: data?.minOff,
            timeFrom: data?.timeFrom,
        }
        createShowTime(dataSubmmit)
    }

    return (
        <div 
            className={styles.showing}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: "flex", flexDirection: "column", maxWidth: "900xp", padding: '40px 80px 20px', gap: '20px' }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={4} md={4} xl={4}>
                        <TextLabel>Phim<p style={{ margin: 0 }}>*</p></TextLabel>
                        <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { ref, ...rest } }) => (
                            <CustomAutocomplete
                                {...rest}
                                placeholder="Chọn film"
                                variant="outlined"
                                options={filmData}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "300px" }}
                            />
                        )}
                        name="idFilm"
                        />
                        {errors?.idFilm?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng chọn phim!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={4} md={4} xl={4}>
                        <TextLabel>
                            Ngày chiếu từ<p style={{ margin: 0 }}>*</p>
                        </TextLabel>
                        <Controller
                            control={control}
                            defaultValue={null}
                            rules={{
                                required: true,
                            }}
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
                        {errors?.dateFrom?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng chọn chiếu từ!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={4} md={4} xl={4}>
                        <TextLabel>
                            Ngày chiếu đến<p style={{ margin: 0 }}>*</p>
                        </TextLabel>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
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
                            name="dateTo"
                        />
                        {errors?.dateTo?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng chọn ngày chiếu đến!{" "}
                        </p>
                        )}
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    
                    {/* <Grid item xs={4} md={4} xl={4}>
                        <TextLabel>
                            Thời gian chiếu đến<p style={{ margin: 0 }}>*</p>
                        </TextLabel>
                        <Controller
                            control={control}
                            defaultValue={null}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { ref, ...rest } }) => (
                                <CustomTimepicker
                                    {...rest}
                                    variant="outlined"
                                    // label="DD/M/YYYY"
                                    placeholder='Chọn thời gian chiếu đến'
                                    // inputFormat="dd/MM/yyyy"
                                    InputLabelProps={{ style: { fontSize: 13, height: "40px" } }}
                                    sx={{ width: "100px", height: "40px" }}
                                />
                            )}
                            name="timeTo"
                        />
                        {errors?.timeTo?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng chọn chiếu đến!{" "}
                        </p>
                        )}
                    </Grid> */}
                    
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4} md={4} xl={4}>
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
                                    setValue('idRoom', null)
                                    onChange(e)
                                }}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "300px" }}
                            />
                        )}
                        name="BranchId"
                        />
                        {errors?.BranchId?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng chọn film!{" "}
                        </p>
                        )}
                    </Grid> 
                </Grid>
                <div>
                    <IconButton
                        onClick={(e) => {
                            console.log(listRoomFilm)
                            if(listRoomFilm.length == 0) {
                                setListroomFilm([0])
                                return 
                            }
                            var max = Math.max(...listRoomFilm)
                            console.log(max)
                            setListroomFilm([...listRoomFilm, max+1]) 
                        }}
                    >
                        <IconAdd />
                    </IconButton>
                </div>
                {listRoomFilm?.map((item, index) => (
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={2} md={2} xl={2}>
                                <TextLabel>Chọn phòng chiếu<p style={{ margin: 0 }}>*</p></TextLabel>
                                <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
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
                                name={`idRoom${item}`}
                                />
                                {errors[`idRoom${item}`]?.type === "required" && (
                                <p style={{ color: "red", marginBottom: 0 }}>
                                    Vui lòng chọn phòng chiếu!{" "}
                                </p>
                                )}
                            </Grid>    
                            <Grid item xs={2} md={2} xl={2}>
                                <TextLabel>
                                    Số suất chiếu<p style={{ margin: 0 }}>*</p>
                                </TextLabel>
                                <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    min: 1,
                                    max: 10
                                }}
                                render={({ field: { ref, onChange, ...rest } }) => (
                                    <TextInput
                                        {...rest}
                                        variant="outlined"
                                        onChange={(e, value) => {
                                            if (
                                            e.nativeEvent.data >= "0" &&
                                            e.nativeEvent.data <= "9"
                                            ) {
                                            onChange(e);
                                            }
                                        }}
                                        InputLabelProps={{ style: { fontSize: 13 } }}
                                        sx={{ width: "300px" }}
                                    />
                                )}
                                name={`countShow${item}`}
                                />
                                {errors[`countShow${item}`]?.type === "required" && (
                                <p style={{ color: "red", marginBottom: 0 }}>
                                    Vui lòng nhập số suất chiếu!{" "}
                                </p>
                                )}  
                                {errors[`countShow${item}`]?.type === "min" && (
                                    <p style={{ color: "red", marginBottom: 0 }}>
                                        Số suất chiếu phải lớn hơn 1!{" "}
                                    </p>
                                )}
                                {errors[`countShow${item}`]?.type === "max" && (
                                    <p style={{ color: "red", marginBottom: 0 }}>
                                    Số suất chiếu nghỉ phải bé hơn 10!{" "}
                                    </p>
                                )}                        
                            </Grid>
                            <Grid item xs={2} md={2} xl={2}>
                                <TextLabel>
                                    Số phút nghỉ<p style={{ margin: 0 }}>*</p>
                                </TextLabel>
                                <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    min: 10,
                                    max: 20
                                }}
                                render={({ field: { ref, onChange, ...rest } }) => (
                                    <TextInput
                                        {...rest}
                                        onChange={(e, value) => {
                                            if (
                                            e.nativeEvent.data >= "0" &&
                                            e.nativeEvent.data <= "9"
                                            ) {
                                            onChange(e);
                                            }
                                        }}
                                        variant="outlined"
                                        InputLabelProps={{ style: { fontSize: 13 } }}
                                        sx={{ width: "300px" }}
                                    />
                                )}
                                name={`minOff${item}`}
                                />
                                {errors[`minOff${item}`]?.type === "required" && (
                                <p style={{ color: "red", marginBottom: 0 }}>
                                    Vui lòng nhập số phút nghỉ!{" "}
                                </p>
                                )}  
                                {errors?.minOff?.type === "min" && (
                                    <p style={{ color: "red", marginBottom: 0 }}>
                                    Số phút nghỉ phải lớn hơn 10!{" "}
                                    </p>
                                )}
                                {errors?.minOff?.type === "max" && (
                                    <p style={{ color: "red", marginBottom: 0 }}>
                                    Số phút nghỉ phải bé hơn 20!{" "}
                                    </p>
                                )}                     
                            </Grid> 
                            <Grid item xs={2} md={2} xl={2}>
                            <TextLabel>
                                Thời gian chiếu từ<p style={{ margin: 0 }}>*</p>
                            </TextLabel>
                            <Controller
                                control={control}
                                defaultValue={null}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { ref, ...rest } }) => (
                                    <CustomTimepicker
                                        {...rest}
                                        variant="outlined"
                                        // label=""
                                        placeholder='Chọn thời gian chiếu từ'
                                        // inputFormat="dd/MM/yyyy"
                                        InputLabelProps={{ style: { fontSize: 13, height: "40px" } }}
                                        sx={{ width: "100px", height: "40px" }}
                                    />
                                )}
                                name={`timeFrom${item}`}
                            />
                            {errors[`timeFrom${item}`]?.type === "required" && (
                            <p style={{ color: "red", marginBottom: 0 }}>
                                Vui lòng chọn chiếu từ!{" "}
                            </p>
                            )}
                        </Grid>  
                        <Grid item xs={2} md={2} xl={2}>
                            <TextLabel>
                                Xem chi tiết
                            </TextLabel>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyItems: 'center'
                                }}
                            >
                                <IconButton sx={{ height: '20px' }}>
                                    <IconSearch />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={1} md={1} xl={1}>
                            <TextLabel>
                            Xóa
                            </TextLabel>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyItems: 'center'
                                }}
                            >
                                <IconButton 
                                    onClick={(e) => {
                                        console.log('item', listRoomFilm)
                                        const listRoom = listRoomFilm?.filter(idx => idx != item)
                                        setListroomFilm(listRoom) 
                                    }}
                                >
                                    <IconDelete />
                                </IconButton>
                            </div>
                        </Grid>
                        </Grid>
                        <ShowtimeEmpty 
                            control={control}
                            listRoom={listRoom}
                            id={item}
                            errors={errors}
                            listRoomFilm={listRoomFilm}
                            setListroomFilm={setListroomFilm}
                        />
                    </div>
                ))}
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
                        Lưu
                    </Button>
                </div>
            </form>
        </div>    
    )
}
export default CreateShowtimeController