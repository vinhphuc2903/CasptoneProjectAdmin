import React, { useEffect, useState } from "react";
import { TextLabel } from "@findxdn/erp-theme";
import { CustomDateTimePickerX, TextInput, CustomAutocomplete } from "../../../components/CustomMUI/ListCustomMui";
import { useForm, Controller } from "react-hook-form";
import styles from './CreateFilmController.module.scss'
import Grid from '@mui/material/Grid';
import {
    Button,
  } from '@findxdn/erp-theme';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LoginAction from "../../../redux/login/action";
import AddressAction from "../../../redux/address/action";
import { FormControlLabel, FormControl } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Utils from "../../../utils/Utils";
import * as RouterPath from "../../../router/RouterPath"
import useRouter from "../../../hooks/use-router";
import getErrorMessage from "../../../utils/ErrorConstant";
import FilmAction from "../../../redux/film/action";
import ImageUpLoading from "../../../components/image-up-loading/ImageUpLoading";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import moment from "moment";

function CreateFilmController()
{
    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors },
        watch,
        reset
    } = useForm();
    const imageRef = React.useRef({
        web: null,
        mobile: null,
        icon: null,
        backgroundImage: null,
    })
    const router= useRouter()

    const [gender, setGender] = React.useState(0);

    const dispatch = useDispatch()
    
    const [listType, setListType] = useState([]);

    const listTypeFilm = listType?.map(item => ({
        key: item.id,
        label: item.name,
    }))

    const CreateFilm = (formData) => {
        dispatch({
            type: FilmAction.CREATE_FILM,
            data: formData,
            onSuccess: (data) => {
                Utils.showSuccessToast({
                  message: "Tạo phim thành công",
                });
                router.push({
                  pathname: RouterPath.FILMPAGE,
                  params: {
                    pages: 10,
                  }
              })
            },
            onError: (data) => {
                Utils.showErrorToast({
                  message:
                    `Tạo phim thất bại: ${getErrorMessage(data)}`,
                });
              },
        })
    }
    
    const listStatusFilm = [
        {
            key: 10,
            label: 'Phim mới',
        },
        {
            key: 20,
            label: 'Đang công chiếu',
        },
        {
            key: 30,
            label: 'Tạm hoãn',
        },
        {
            key: 40,
            label: 'Đã xóa',
        }
    ]
    const getTypeFilm = async() => {
        dispatch({
          type: FilmAction.GET_TYPE_FILM,
          onSuccess: (data) => {
            setListType(data)
          },
        })
      }
    
    useEffect(() => {
        getTypeFilm()
    }, [])
    
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

    const onSubmit = (data) => {
        // const params = {
        //     Name: data?.name,
        //     EmployeeCode: data?.code,
        //     BranchId: data?.branch,
        //     PositionId: data?.position,
        //     DateStart: data?.dateStart
        // }
        var submit = false
        switch(gender)
        {
            case 0:
                submit = true
                break;
            case 1:
                submit = false
                break;
            default:
                submit = false
        }
        const date = new Date(data.dateStart);
        const utcDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        const formattedDate = utcDate.toISOString();
        const dateTo = new Date(data.dateEnd);
        const utcDatTo = new Date(dateTo.getTime() - (dateTo.getTimezoneOffset() * 60000));
        const formattedDateTo = utcDatTo.toISOString();
        const formData = new FormData();
        formData.append('Country', data?.Country);
        formData.append('Introduce', data?.Introduce);
        formData.append('Status', data?.Status);
        formData.append('ListTypeFilm', data?.ListTypeFilm);
        formData.append('Actor', data?.actor);
        formData.append('AgeLimit', data?.ageLimit);
        formData.append('BackgroundImage', data?.backgroundImage.file);
        formData.append('DateStart', formattedDate);
        formData.append('DateEnd', formattedDateTo);
        formData.append('Director', data?.director);
        formData.append('IsSubtittle', submit);
        formData.append('Language', data?.language);
        formData.append('Name', data?.name);
        formData.append('Time', data?.time);
        formData.append('TrailerLink', data?.trailerLink);
        formData.append('Cost', data?.cost);
        formData.append('DateRelease', moment(data?.dateRelease).format('YYYY/MM/DD'));
        CreateFilm(formData)
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
                            Tên film<p style={{ margin: 0 }}>*</p>
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
                                placeholder='Nhập tên film'
                                variant="outlined"
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "100px" }}
                            />
                        )}
                        name="name"
                        />
                        {errors?.name?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập tên film!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Ngày bắt đầu chiếu<p style={{ margin: 0 }}>*</p>
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
                            name="dateStart"
                        />
                        {errors?.dateStart?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng chọn ngày bắt đầu chiếu!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Ngày kết thúc chiếu<p style={{ margin: 0 }}>*</p>
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
                            name="dateEnd"
                        />
                        {errors?.dateEnd?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng chọn ngày kết thúc chiếu!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Độ tuổi giới hạn<p style={{ margin: 0 }}>*</p>
                        </TextLabel>
                        <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { ref, ...rest } }) => (
                            <TextInput
                            {...rest}
                            variant="outlined"
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            sx={{ width: "300px" }}
                            />
                        )}
                        name="ageLimit"
                        />
                        {errors?.ageLimit?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập độ tuổi giưới hạn!{" "}
                        </p>
                        )}
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Độ dài film (Phút)<p style={{ margin: 0 }}>*</p>
                        </TextLabel>
                        <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { ref, ...rest } }) => (
                            <TextInput
                            {...rest}
                            variant="outlined"
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            sx={{ width: "300px" }}
                            />
                        )}
                        name="time"
                        />
                        {errors?.time?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập độ dài film!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Ngôn ngữ<p style={{ margin: 0 }}>*</p>
                        </TextLabel>
                        <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { ref, ...rest } }) => (
                            <TextInput
                            {...rest}
                            variant="outlined"
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            sx={{ width: "300px" }}
                            />
                        )}
                        name="language"
                        />
                        {errors?.language?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập ngôn ngữ!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Diễn viên <p style={{ margin: 0 }}>*</p>
                        </TextLabel>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { ref, ...rest } }) => (
                                <TextInput
                                {...rest}
                                // label='Họ '
                                disablePortal
                                variant="outlined"
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "300px" }}
                                />
                            )}
                            name="actor"
                        />
                        {errors?.actor?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập thông tin diễn viên!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>Đạo diễn <p style={{ margin: 0 }}>*</p></TextLabel>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { ref, ...rest } }) => (
                                <TextInput
                                {...rest}
                                variant="outlined"
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "300px" }}
                                />
                            )}
                            name="director"
                        />
                        {errors?.director?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập thông tin đạo diễn!{" "}
                        </p>
                        )}
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Đất nước<p style={{ margin: 0 }}>*</p>
                        </TextLabel>
                        <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { ref, ...rest } }) => (
                            <TextInput
                            {...rest}
                            variant="outlined"
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            sx={{ width: "300px" }}
                            />
                        )}
                        name="Country"
                        />
                        {errors?.Country?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập đất nước!{" "}
                        </p>
                        )}
                    </Grid>
                    {/* <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>Trạng thái film<p style={{ margin: 0 }}>*</p></TextLabel>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { ref, ...rest } }) => (
                            <CustomAutocomplete
                                {...rest}
                                placeholder="Chọn trạng thái film"
                                variant="outlined"
                                options={listStatusFilm}
                                maxLength={50}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                                sx={{ width: "300px" }}
                                />
                            )}
                        name="Status"
                        />
                        {errors?.Status?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng chọn trạng thái film!{" "}
                        </p>
                        )}
                    </Grid> */}
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>Đường dẫn giới thiệu film<p style={{ margin: 0 }}>*</p></TextLabel>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                maxLength: 50,
                            }}
                            render={({ field: { ref, ...rest } }) => (
                                <TextInput
                                    {...rest}
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: 13 } }}
                                    sx={{ width: "300px" }}
                                />
                            )}
                            name="trailerLink"
                        />
                        {errors?.trailerLink?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập đường dẫn giới thiệu film!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <FormControl>
                            <TextLabel>Phụ đề<p style={{ margin: 0 }}>*</p></TextLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={gender}
                                onChange={(e, id) => {
                                    setGender(parseInt(id, 10));
                                }}
                            >
                                <FormControlLabel value={0} control={<Radio />} label="Có" />
                                <FormControlLabel value={1} control={<Radio />} label="Không" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Vốn đầu tư($)<p style={{ margin: 0 }}>*</p>
                        </TextLabel>
                        <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { ref, ...rest } }) => (
                            <TextInput
                            {...rest}
                            variant="outlined"
                            placeholder='Vốn đầu tư'
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            sx={{ width: "300px" }}
                            />
                        )}
                        name="cost"
                        />
                        {errors?.cost?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập vốn đầu tư!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>
                            Ngày phát hành<p style={{ margin: 0 }}>*</p>
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
                            name="dateRelease"
                        />
                        {errors?.dateRelease?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng chọn ngày phát hành!{" "}
                        </p>
                        )}
                    </Grid>
                    <Grid item xs={3} md={6} xl={6}>
                        <TextLabel>
                            Giới thiệu film<p style={{ margin: 0 }}>*</p>
                        </TextLabel>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { ref, ...rest } }) => (
                                <TextInput
                                    {...rest}
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: 13 } }}
                                    sx={{ width: "300px" }}
                                />
                            )}
                            name="Introduce"
                        />
                        {errors?.Introduce?.type === "required" && (
                        <p style={{ color: "red", marginBottom: 0 }}>
                            Vui lòng nhập giới thiệu film!{" "}
                        </p>
                        )}
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={3} md={3} xl={3}>
                        <TextLabel>Thể loại film<p style={{ margin: 0 }}>*</p></TextLabel>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                maxLength: 50,
                            }}
                            render={({ field: { ref, value, onChange, onBlur, ...rest } }) => (
                                <CustomSelect
                                    {...rest}
                                    onChange={(e) => {
                                        console.log(e)
                                        onChange(e);
                                      }}
                                    onBlur={onBlur}
                                    placeholder="Chọn thể loại film"
                                    variant="outlined"
                                    // options={listTypeFilm}
                                    options={listTypeFilm?.map((v) => ({
                                        ...v,
                                        value: v?.key,
                                      }))}
                                    maxLength={50}
                                    value={value ? [...value] : []}
                                    isMulti={true}
                                    InputLabelProps={{ style: { fontSize: 13 } }}
                                    sx={{ width: "300px" }}
                                />
                            )}
                            name="ListTypeFilm"
                            />
                            {errors?.ListTypeFilm?.type === "required" && (
                            <p style={{ color: "red", marginBottom: 0 }}>
                                Vui lòng chọn thể loại film!{" "}
                            </p>
                        )}
                    </Grid>    
                    <Grid item xs={3} md={5} xl={3}>
                        <div style={{height: '140px'}}>
                            <TextLabel>Ảnh bìa<p style={{ margin: 0 }}>*</p></TextLabel>
                            <Controller 
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({field}) => (
                                    <ImageUpLoading 
                                        {...field}
                                        imageRef={imageRef}
                                        defaultValue={getValues('Avatar')}
                                    />
                                )}
                                name="backgroundImage"
                            />
                            {errors?.backgroundImage?.type === "required" && (
                            <p style={{ color: "red", marginBottom: 0 }}>
                                Vui lòng tải ảnh bìa lên!{" "}
                            </p>
                            )}    
                        </div>
                    </Grid>
                </Grid>
                <div 
                    className="d-flex justify-content-end"
                    style={{
                        padding:'60px 20px 20px',
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
export default CreateFilmController