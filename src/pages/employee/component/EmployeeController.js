import React, { useEffect, useState } from "react";
import EmployeeTable from "./TableEmployee/EmployeeTable";
import { TextLabel } from "@findxdn/erp-theme";
import { CustomDateTimePickerX, TextInput, CustomAutocomplete } from "../../../components/CustomMUI/ListCustomMui";
import { useForm, Controller } from "react-hook-form";
import styles from './EmployeeController.module.scss'
import Grid from '@mui/material/Grid';
import {
    Button,
  } from '@findxdn/erp-theme';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LoginAction from "../../../redux/login/action";
import AddressAction from "../../../redux/address/action";

function EmployeeController()
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

    const listEmployee = useSelector((state) => state?.Login?.listEmployee);
    const [listBranch, setListBranch] = useState([])
    const [listPosition, setListPosition] = useState([])

    const getAllEmployee = (dataSubmit) => {
        dispatch({
            type: LoginAction.GET_ALL_EMPLOYEE,
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
    const getPosition = (dataSubmit) => {
        dispatch({
            type: AddressAction.GET_POSITION,
            onSuccess: (data) => {
                setListPosition(data?.map(item=>({ key: item?.id, label: item?.name})))
            },
        })
    }
    useEffect(() => {
        getAllEmployee()
        getBranch()
        getPosition()
    }, [])
    
    const onReset = () => {
        reset({
          name: '',
          code: '',
          branch: null,
          position: null,
          dateStart: null
        });
        getAllEmployee()
        // handleReset();
      };

    const onSubmit = (data) => {
        const params = {
            Name: data?.name,
            EmployeeCode: data?.code,
            BranchId: data?.branch,
            PositionId: data?.position,
            DateStart: data?.dateStart
        }
        getAllEmployee(params)
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
                            Tên nhân viên
                        </TextLabel>
                        <Controller
                            control={control}
                            render={({ field: { ref, ...rest } }) => (
                                <TextInput
                                {...rest}
                                disablePortal
                                placeholder='Nhập tên nhân viên'
                                variant="outlined"
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "100px" }}
                            />
                        )}
                        name="name"
                        />
                    </Grid>
                    <Grid item xs={3} md={2} xl={3}>
                        <TextLabel>
                            Mã nhân sự
                        </TextLabel>
                        <Controller
                            control={control}
                            render={({ field: { ref, ...rest } }) => (
                                <TextInput
                                {...rest}
                                disablePortal
                                placeholder='Nhập mã nhân viên'
                                variant="outlined"
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "100px" }}
                                />
                            )}
                            name="code"
                        />
                    </Grid>
                    <Grid item xs={3} md={2} xl={3}>
                        <TextLabel>
                            Ngày vào làm
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
                            name="dateStart"
                        />
                    </Grid>
                    <Grid item xs={3} md={2} xl={3}>
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
                        name="branch"
                        />
                    </Grid>
                    <Grid item xs={3} md={2} xl={3}>
                        <TextLabel>Vị trí</TextLabel>
                        <Controller
                        control={control}
                        render={({ field: { ref, ...rest } }) => (
                            <CustomAutocomplete
                                {...rest}
                                placeholder="Chọn vị trí"
                                variant="outlined"
                                options={listPosition}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "300px" }}
                            />
                        )}
                        name="position"
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
            <EmployeeTable data={listEmployee} tableName='Danh sách nhân viên' /> 
        </div>    
    )
}
export default EmployeeController