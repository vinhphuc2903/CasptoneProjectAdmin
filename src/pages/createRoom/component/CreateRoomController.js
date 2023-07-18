import React, { useEffect, useState } from "react";
import { TextLabel } from "@findxdn/erp-theme";
import { CustomDateTimePickerX, TextInput, CustomAutocomplete } from "../../../components/CustomMUI/ListCustomMui";
import { useForm, Controller } from "react-hook-form";
import styles from './CreateRoomController.module.scss'
import Grid from '@mui/material/Grid';
import {
    Button,
  } from '@findxdn/erp-theme';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LoginAction from "../../../redux/login/action";
import AddressAction from "../../../redux/address/action";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Utils from "../../../utils/Utils";
import * as RouterPath from "../../../router/RouterPath"
import useRouter from "../../../hooks/use-router";
import getErrorMessage from "../../../utils/ErrorConstant";
import CinemaRoomAction from "../../../redux/cimemaroom/action";

function CreateRoomController()
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

    const [gender, setGender] = React.useState(0);

    const dispatch = useDispatch()

    const [listBranch, setListBranch] = useState([])

    const CreateRoom = (dataSubmit) => {
        dispatch({
            type: CinemaRoomAction.CREATE_CINEMAROOM,
            data: dataSubmit,
            onSuccess: (data) => {
                console.log(data)
                Utils.showSuccessToast({
                  message: "Tạo phòng chiếu thành công",
                });
                router.push({
                  pathname: RouterPath.ROOM_LIST,
              })
            },
            onError: (data) => {
                Utils.showErrorToast({
                  message:
                    `Tạo phòng chiếu thất bại: ${getErrorMessage(data)}`,
                });
              },
        })
    }
 
    const getBranch = (dataSubmit) => {
        dispatch({
            type: AddressAction.GET_BRANCH,
            onSuccess: (data) => {
                setListBranch(data?.map(item=>({ key: item?.id, label: item?.name})))
            },
        })
    }

    useEffect(() => {
        getBranch()
    }, [])
    
    const onReset = () => {
        reset({
          name: '',
          branch: null,
          position: null,
          dateStart: null
        });
      };

    const onSubmit = (data) => {
        const dataSubmmit = {
            name: data?.name,
            totalColumn: data?.totalColumn,
            totalRow: data?.totalRow,
            totalSeat: data?.totalSeat,
            branchId: data?.branchId,
          }
        CreateRoom(dataSubmmit)
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
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Tên phòng chiếu<p style={{ margin: 0 }}>*</p>
                        </TextLabel>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { ref, ...rest } }) => (
                                <TextInput
                                    {...rest}
                                    disablePortal
                                    placeholder='Nhập tên phòng chiếu'
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: 13 } }}
                                    sx={{ width: "100px" }}
                                />
                            )}
                        name="name"
                        />
                        {errors?.name?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập tên phòng chiếu!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Số dãy phòng chiếu<p style={{ margin: 0 }}>*</p>
                        </TextLabel>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { ref, ...rest } }) => (
                                <TextInput
                                    {...rest}
                                    disablePortal
                                    placeholder='Số dãy phòng chiếu'
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: 13 } }}
                                    sx={{ width: "100px" }}
                                    type="number"
                                />
                            )}
                        name="totalRow"
                        />
                        {errors?.totalRow?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập số hàng phòng chiếu!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Số cột phòng chiếu<p style={{ margin: 0 }}>*</p>
                        </TextLabel>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { ref, ...rest } }) => (
                                <TextInput
                                    {...rest}
                                    disablePortal
                                    placeholder='Số cột phòng chiếu'
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: 13 } }}
                                    sx={{ width: "100px" }}
                                    type="number"
                                />
                            )}
                        name="totalColumn"
                        />
                        {errors?.totalColumn?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập số cột phòng chiếu!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>Chi nhánh<p style={{ margin: 0 }}>*</p></TextLabel>
                        <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
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
                        name="branchId"
                        />
                        {errors?.branchId?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng chọn chi nhánh!{" "}
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
                        Lưu
                    </Button>
                </div>
            </form>
        </div>    
    )
}
export default CreateRoomController