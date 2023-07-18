import React, { useEffect, useState } from "react";
import CustomerTable from "./TableCustomer/CustomerTable";
import { TextLabel } from "@findxdn/erp-theme";
import { CustomDateTimePickerX, TextInput, CustomAutocomplete } from "../../../components/CustomMUI/ListCustomMui";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useForm, Controller } from "react-hook-form";
import Utils from "../../../utils/Utils";
import useRouter from "../../../hooks/use-router";
import styles from './CustomerController.module.scss'
import Grid from '@mui/material/Grid';
import {
    Button,
  } from '@findxdn/erp-theme';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AddressAction from "../../../redux/address/action";
import CustomerAction from "../../../redux/customer/action"; 

function CustomerController()
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

    const listCustomer = useSelector((state) => state?.Customer?.listCustomer);
    const [listBranch, setListBranch] = useState([])
    const [listPosition, setListPosition] = useState([])
    const getAllCustomer = (dataSubmit) => {
        dispatch({
            type: CustomerAction.GET_ALL_CUSTOMER,
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
        getAllCustomer()
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
        getAllCustomer()
        // handleReset();
      };

    const onSubmit = (data) => {
        const params = {
            Name: data?.name,
            CustomerCode: data?.code,
            BranchId: data?.branch,
            PositionId: data?.position,
            DateStart: data?.dateStart
        }
        getAllCustomer(params)
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
                            Tên khách hàng
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
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Ngày sinh
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
                            name="dateOfBirth"
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
            <CustomerTable data={listCustomer} tableName='Danh sách nhân viên' /> 
        </div>    
    )
}
export default CustomerController