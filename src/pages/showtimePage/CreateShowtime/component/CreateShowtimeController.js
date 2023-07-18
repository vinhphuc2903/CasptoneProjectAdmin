import React, { useEffect, useState } from "react";
import { TextLabel } from "@findxdn/erp-theme";
import {
  CustomDateTimePickerX,
  TextInput,
  CustomAutocomplete,
  CustomTimepicker,
} from "../../../../components/CustomMUI/ListCustomMui";
// import { CustomDateTimePickerX } from "../../../../components/CustomMUI/ListCustomMui";
import { useForm, Controller } from "react-hook-form";
import styles from "./CreateShowtimeController.module.scss";
import Grid from "@mui/material/Grid";
import { Button } from "@findxdn/erp-theme";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LoginAction from "../../../../redux/login/action";
import AddressAction from "../../../../redux/address/action";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Utils from "../../../../utils/Utils";
import * as RouterPath from "../../../../router/RouterPath";
import useRouter from "../../../../hooks/use-router";
import getErrorMessage from "../../../../utils/ErrorConstant";
import FilmAction from "../../../../redux/film/action";
import CinemaRoomAction from "../../../../redux/cimemaroom/action";
import ShowtimeAction from "../../../../redux/showtime/action";
import moment from "moment";

function CreateShowtimeController() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
    getValues,
    reset,
  } = useForm();
  const router = useRouter();

  const dispatch = useDispatch();
  const ChoooseShowRoom = useSelector((state) => state.CreateShowTime);
  const [listBranch, setListBranch] = useState([]);
  const [listRoom, setListRoom] = useState([]);

  const [listShowtime, setListShowtime] = useState([]);
  const itemShowTime = (showTime) => {
    return (
      <div
        style={{
          backgroundColor: "#dc5c5c",
          color: "#efe9e9",
          padding: "4px 6px",
          width: "fit-content",
          borer: "1px solid white",
        }}
      >
        {showTime}
      </div>
    );
  };
  function formatNumber(num) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num.toLocaleString();
    }
  }
  const getDetailShowTime = (props) => {
    const { DateEndData = null, CinemeRoomIdData = null, DateStart =null} = props
    const DateRecord = DateStart ?? getValues("dateFrom");
    const DateEnd = DateEndData ?? getValues("dateTo");
    const BranchId = getValues("BranchId");
    const CinemeRoomId = CinemeRoomIdData ?? getValues("idRoom");
    if (CinemeRoomId && DateRecord) {
      const params = {
        DateRecord:
          typeof DateRecord != "undefined" && DateRecord != null
            ? moment(DateRecord).format("MM/DD/YYYY")
            : null,
        DateEnd:
          typeof DateEnd != "undefined" && DateEnd != null
            ? moment(DateEnd).format("MM/DD/YYYY")
            : null,
        BranchId: BranchId,
        CinemeRoomId: CinemeRoomId,
      };
      dispatch({
        type: FilmAction.GET_SHOWTIME_BY_BRANCH,
        params: params,
        onSuccess: (data) => {
          setListShowtime(data);
          // setListProduct(data?.data?.result)
        },
      });
    } else {
      setListShowtime([]);
    }
  };

  const listFilm = useSelector((state) => state?.Film);
  const filmData = listFilm?.film?.map((item) => ({
    key: item?.id,
    label: item?.name,
  }));

  const getAllFilm = async (dataSearch = {}) => {
    var status = 20;
    const dataSubmit = {
      Status: status,
    };
    dispatch({
      type: FilmAction.GET_ALL_FILM,
      params: dataSubmit,
      onSuccess: (data) => {},
    });
  };
  const getBranch = (dataSubmit) => {
    dispatch({
      type: AddressAction.GET_BRANCH,
      params: dataSubmit,
      onSuccess: (data) => {
        setListBranch(
          data?.map((item) => ({ key: item?.id, label: item?.name }))
        );
      },
    });
  };
  const getRoom = (dataSubmit) => {
    dispatch({
      type: CinemaRoomAction.GET_LIST_CINEMAROOM,
      params: { BranchId: dataSubmit },
      onSuccess: (data) => {
        setListRoom(
          data?.map((item) => ({ key: item?.id, label: item?.name }))
        );
      },
    });
  };
  useEffect(() => {
    getAllFilm();
    getBranch();
  }, []);

  const onReset = () => {
    reset({
      name: "",
      branch: null,
      position: null,
      dateStart: null,
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
        });
      },
      onError: (data) => {
        console.log(data);
        Utils.showErrorToast({
          message: `Tạo lịch chiếu thất bại: ${getErrorMessage(data)}`,
        });
      },
    });
  };
  const onSubmit = (data) => {
    const date = new Date(data.dateFrom);
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const formattedDate = utcDate.toISOString();
    const dateTo = new Date(data.dateTo);
    const utcDatTo = new Date(
      dateTo.getTime() - dateTo.getTimezoneOffset() * 60000
    );
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
    };
    createShowTime(dataSubmmit);
  };

  return (
    <div className={styles.showing}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "900xp",
          padding: "40px 80px 20px",
          gap: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4} md={4} xl={4}>
            <TextLabel>
              Phim<p style={{ margin: 0 }}>*</p>
            </TextLabel>
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
                Vui lòng phim chiếu!{" "}
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
              render={({ field: { ref, onChange, ...rest } }) => (
                <CustomDateTimePickerX
                  {...rest}
                  variant="outlined"
                  label="DD/M/YYYY"
                  onChange={(e) =>
                    {
                        getDetailShowTime({
                            DateStart: e,
                        });
                        onChange(e)
                    }}
                  placeholder="Chọn ngày"
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
              render={({ field: { ref, onChange,...rest } }) => (
                <CustomDateTimePickerX
                  {...rest}
                  variant="outlined"
                  label="DD/M/YYYY"
                  onChange={(e) =>
                    {
                        getDetailShowTime({
                            DateEndData: e,
                        });
                        onChange(e)
                    }}
                  placeholder="Chọn ngày"
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
          <Grid item xs={4} md={4} xl={4}>
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
                  placeholder="Chọn thời gian chiếu từ"
                  // inputFormat="dd/MM/yyyy"
                  InputLabelProps={{ style: { fontSize: 13, height: "40px" } }}
                  sx={{ width: "100px", height: "40px" }}
                />
              )}
              name="timeFrom"
            />
            {errors?.timeFrom?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng chọn chiếu từ!{" "}
              </p>
            )}
          </Grid>
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
          <Grid item xs={4} md={4} xl={4}>
            <TextLabel>
              Số suất chiếu<p style={{ margin: 0 }}>*</p>
            </TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
                min: 1,
                max: 10,
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
              name="countShow"
            />
            {errors?.countShow?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng nhập số suất chiếu!{" "}
              </p>
            )}
            {errors?.countShow?.type === "min" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Số suất chiếu phải lớn hơn 1!{" "}
              </p>
            )}
            {errors?.countShow?.type === "max" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Số suất chiếu nghỉ phải bé hơn 10!{" "}
              </p>
            )}
          </Grid>
          <Grid item xs={4} md={4} xl={4}>
            <TextLabel>
              Số phút nghỉ<p style={{ margin: 0 }}>*</p>
            </TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
                min: 10,
                max: 20,
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
              name="minOff"
            />
            {errors?.minOff?.type === "required" && (
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
                  onChange={(e) => {
                    getRoom(e);
                    setValue("idRoom", null);
                    getDetailShowTime({DateEndData: null});
                    onChange(e);
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
          <Grid item xs={4} md={4} xl={4}>
            <TextLabel>
              Chọn phòng chiếu<p style={{ margin: 0 }}>*</p>
            </TextLabel>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { ref, onChange, ...rest } }) => (
                <CustomAutocomplete
                  {...rest}
                  placeholder="Chọn phòng chiếu"
                  variant="outlined"
                  options={listRoom}
                  onChange={(e) => {
                    onChange(e);
                    getDetailShowTime({
                        CinemeRoomIdData: e
                    });
                  }}
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  sx={{ width: "300px" }}
                />
              )}
              name="idRoom"
            />
            {errors?.idRoom?.type === "required" && (
              <p style={{ color: "red", marginBottom: 0 }}>
                Vui lòng chọn phòng chiếu!{" "}
              </p>
            )}
          </Grid>
        </Grid>
        {listShowtime?.length != 0 && (
          <div
            style={{
              fontSize: "20px",
              fontWeight: "500",
              padding: "20px 40px",
            }}
          >
            Danh sách suất chiếu đã tồn tại:
            {listShowtime?.map((item, index) => (
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                <div
                  style={{
                    fontWeight: "500",
                  }}
                >
                  Ngày: {moment(item?.dateRecord).format("DD/MM/YYYY")}
                </div>
                {item?.showTimeByDates?.map((st) => (
                  <div
                    style={{
                      paddingLeft: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "500",
                      }}
                    >
                      Phim: {st?.filmInfo?.name}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: "500",
                          display: "flex",
                          flexDirection: "row",
                          padding: '0px 20px',
                        }}
                      >
                        Suất chiếu
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: 'wrap',
                          padding: '0px 30px',
                          gap: '20px'
                        }}
                      >
                        {st?.showTimeDetailByDates?.map((stdl) => (
                          <div
                            style={{ width: '200px' }}
                          >
                            {formatNumber(stdl?.fromHour)}h :{" "}
                            {formatNumber(stdl?.fromMinus)}' {" "}
                            - {formatNumber(stdl?.toHour)}h :{" "}
                            {formatNumber(stdl?.toMinus)}'
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <div
          className="d-flex justify-content-end"
          style={{
            padding: "20px",
            gap: "20px",
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
  );
}
export default CreateShowtimeController;
