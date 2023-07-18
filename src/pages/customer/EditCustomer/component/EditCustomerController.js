import React, { useEffect, useState } from "react";
import { TextLabel } from "@findxdn/erp-theme";
import { CustomDateTimePickerX, TextInput, CustomAutocomplete } from "../../../../components/CustomMUI/ListCustomMui";
// import { CustomDateTimePickerX } from "../../../../components/CustomMUI/ListCustomMui";
import { useForm, Controller } from "react-hook-form";
import styles from './EditCustomerController.module.scss'
import Grid from '@mui/material/Grid';
import {
    Button,
  } from '@findxdn/erp-theme';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AddressAction from "../../../../redux/address/action";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Utils from "../../../../utils/Utils";
import * as RouterPath from "../../../../router/RouterPath"
import useRouter from "../../../../hooks/use-router";
import getErrorMessage from "../../../../utils/ErrorConstant";
import CustomerAction from "../../../../redux/customer/action";

function EditCustomerController()
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
    const [listPosition, setListPosition] = useState([])

    const updateCustomer = (dataSubmit) => {
        dispatch({
            type: CustomerAction.UPDATE_CUSTOMER,
            data: dataSubmit,
            onSuccess: (data) => {
                console.log(data)
                Utils.showSuccessToast({
                  message: "Cập nhật khách hàng thành công",
                });
                router.push({
                  pathname: RouterPath.DETAIL_CUSTOMER,
                  params: {
                    id: params?.id,
                  }
                })
            },
            onError: (data) => {
                Utils.showErrorToast({
                  message:
                    `Cập nhật khách hàng thất bại: ${getErrorMessage(data)}`,
                });
              },
        })
    }
    const isValidPhone = (value) =>
        value &&
        !/(090|093|070|072|079|077|076|078|089|088|091|094|083|084|085|081|082|032|033|034|035|036|037|038|039|086|096|097|098|099|059|092|052|056|058)+([0-9]{7})\b/i.test(
        value
        )
        ? "Số điện thoại không hợp lệ"
      : undefined;

    const isValidEmail = (email) =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
    let params = { ...router.getAll() };

    const handleEmailValidation = (email) => {
        const isValid = isValidEmail(email);
        return isValid;
    };

    const handlePhoneValidation = (phone) => {
        const isValid = isValidPhone(phone);
        return isValid;
    };

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
    const address = useSelector((state) => state.Address);
    const getProvice = async () => {
      dispatch({
        type: AddressAction.GET_PROVINCE,
      });
    };
    const listProvince = address?.provinces?.map((item) => ({
      key: item?.id,
      label: item?.name,
    }));
  
    const listDistrict = address?.districts?.map((item) => ({
      key: item?.id,
      label: item?.name,
    }));
  
    const listCommune = address?.communes?.map((item) => ({
      key: item?.id,
      label: item?.name,
    }));
    const getDistrict = async (id) => {
      dispatch({
        type: AddressAction.GET_DISTRICT,
        data: { provinceId: id },
      });
    };
  
    const getCommunity = async (id) => {
      dispatch({
        type: AddressAction.GET_COMMUNITY,
        data: { districtId: id },
      });
    };
    const getAllCustomer = () => {
        dispatch({
            type: CustomerAction.GET_ALL_CUSTOMER,
            params: { Id: params?.id },
            onSuccess: (data) => {
              if(data?.data?.length)
              {
                // setListCustomer(data?.data[0])
                setValue('name', data?.data[0]?.name)
                setValue('dateOfBirth', data?.data[0]?.dateOfBirth)
                setValue('email', data?.data[0]?.email)
                setValue('address', data?.data[0]?.address)
                setValue('province', data?.data[0]?.provinceId)
                data?.data[0]?.provinceId && getDistrict(data?.data[0]?.provinceId)
                setValue('district', data?.data[0]?.districtId)
                data?.data[0]?.districtId && getCommunity(data?.data[0]?.districtId)
                setValue('commune', data?.data[0]?.communeId)
                setValue('phone', data?.data[0]?.phone)
                switch(data?.data[0]?.gender)
                    {
                        case 'M':
                            setGender(0)
                            break;
                        case 'F':
                            setGender(1)
                            break;
                        case 'O':
                            setGender(2)
                            break;
                        default:
                    }
              }
            },
        })
    }
    useEffect(() => {
        getBranch()
        getProvice()
        getPosition()
        getAllCustomer()
    }, [])
    
    const onReset = () => {
        reset({
          name: '',
          branch: null,
          position: null,
          dateStart: null
        });
        // getAllCustomer()
        // handleReset();
      };

    const onSubmit = (data) => {
        var genderData = 'M'
        switch(gender)
        {
            case 0:
                genderData = 'M'
                break;
            case 1:
                genderData = 'F'
                break;
            case 2:
                genderData = 'O'
                break;
            default:
                genderData = ''
        }
        const dataSubmmit = {
            name: data?.name,
            username: data?.inputName,
            phone: data?.phone,
            email: data?.email,
            dateOfBirth: data?.dateOfBirth,
            dateStart: data?.dateStart,
            gender: genderData,
            address: data?.address,
            districtId: data?.district,
            provinceId: data?.province,
            communeId: data?.commune,
            branchId: data?.branch,
            positionId: data?.position,
            id: params?.id
          }
          updateCustomer(dataSubmmit)
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
                            Tên khách hàng<p style={{ margin: 0 }}>*</p>
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
                                placeholder='Nhập tên khách hàng'
                                variant="outlined"
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "100px" }}
                            />
                        )}
                        name="name"
                        />
                        {errors?.name?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập tên khách hàng!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Ngày sinh<p style={{ margin: 0 }}>*</p>
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
                            name="dateOfBirth"
                        />
                        {errors?.dateOfBirth?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng chọn ngày sinh!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                        Email<p style={{ margin: 0 }}>*</p>
                        </TextLabel>
                        <Controller
                        control={control}
                        rules={{
                            required: true,
                            validate: handleEmailValidation,
                        }}
                        render={({ field: { ref, ...rest } }) => (
                            <TextInput
                            {...rest}
                            variant="outlined"
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            sx={{ width: "300px" }}
                            />
                        )}
                        name="email"
                        />
                        {errors?.email?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập email để đăng ký!{" "}
                        </p>
                        )}
                        {errors?.email?.type === "validate" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập email đúng định dạng!{" "}
                        </p>
                        )}
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={3} md={3} xl={3}>
                    <TextLabel>Địa chỉ<p style={{ margin: 0 }}>*</p></TextLabel>
                        <Controller
                        control={control}
                        rules={{
                            required: true,
                            maxLength: 50,
                        }}
                        render={({ field: { ref, ...rest } }) => (
                            <TextInput
                            {...rest}
                            label="   "
                            variant="outlined"
                            maxLength={50}
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            sx={{ width: "300px" }}
                            />
                        )}
                        name="address"
                        />
                        {errors?.address?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập địa chỉ!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                    <TextLabel>Tỉnh/ Thành phố<p style={{ margin: 0 }}>*</p></TextLabel>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            maxLength: 50,
                        }}
                        render={({ field: { ref, onChange, ...rest } }) => (
                        <CustomAutocomplete
                            {...rest}
                            placeholder="Chọn Tỉnh/ Thành phố"
                            variant="outlined"
                            options={listProvince}
                            onChange={(value) => {
                                onChange(value);
                                getDistrict(value == null ? 'xxx' : value)
                                getCommunity(value == null ? 'xxx' : value)
                                setValue('district', null)
                                setValue('commune', null)
                            }}
                            maxLength={50}
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            sx={{ width: "300px" }}
                            />
                        )}
                        name="province"
                        />
                        {errors?.province?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng chọn tỉnh!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>Quận/ Huyện<p style={{ margin: 0 }}>*</p></TextLabel>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                maxLength: 50,
                            }}
                            render={({ field: { ref, onChange, ...rest } }) => (
                                <CustomAutocomplete
                                {...rest}
                                placeholder="Chọn Quận/ Huyện"
                                variant="outlined"
                                options={listDistrict}
                                onChange={(value) => {
                                    onChange(value)
                                    setValue('commune', null)
                                    getCommunity(value == null ? 'xxx' : value)
                                }}
                                maxLength={50}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "300px" }}
                                />
                            )}
                            name="district"
                        />
                        {errors?.district?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng chọn quận, huyện!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>Phường/ Xã<p style={{ margin: 0 }}>*</p></TextLabel>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                maxLength: 50,
                            }}
                            render={({ field: { ref, ...rest } }) => (
                                <CustomAutocomplete
                                {...rest}
                                placeholder="Chọn Phường/ Xã"
                                variant="outlined"
                                options={listCommune}
                                maxLength={50}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "300px" }}
                                />
                            )}
                            name="commune"
                            />
                            {errors?.commune?.type === "required" && (
                            <p style={{ color: "red", marginBottom: 0 }}>
                                Vui lòng chọn phường, xã!{" "}
                            </p>
                        )}
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Số điện thoại<p style={{ margin: 0 }}>*</p>
                        </TextLabel>
                        <Controller
                        control={control}
                        rules={{
                            required: true,
                            validate: handlePhoneValidation,
                        }}
                        render={({ field: { ref, ...rest } }) => (
                            <TextInput
                            {...rest}
                            variant="outlined"
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            sx={{ width: "300px" }}
                            />
                        )}
                        name="phone"
                        />
                        {errors?.phone?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập số điện thoại!{" "}
                        </p>
                        )}
                        {errors?.phone?.type === "validate" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập số điện thoại đúng định dạng!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={5} xl={3}>
                        <FormControl>
                            <TextLabel>Giới tính<p style={{ margin: 0 }}>*</p></TextLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={gender}
                                onChange={(e, id) => {
                                    setGender(parseInt(id, 10));
                                }}
                            >
                                <FormControlLabel value={0} control={<Radio />} label="Nam" />
                                <FormControlLabel value={1} control={<Radio />} label="Nữ" />
                                <FormControlLabel value={2} control={<Radio />} label="Khác" />
                            </RadioGroup>
                        </FormControl>
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
export default EditCustomerController