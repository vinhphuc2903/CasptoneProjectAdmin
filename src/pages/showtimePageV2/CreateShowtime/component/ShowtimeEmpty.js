import React from "react";
import IconDelete from "../../../../assets/icons/icon-delete";
import { TextLabel } from "@findxdn/erp-theme";
import { Grid } from "react-virtualized";
import { Controller } from "react-hook-form";
import {
  CustomDateTimePickerX,
  TextInput,
  CustomAutocomplete,
  CustomTimepicker,
} from "../../../../components/CustomMUI/ListCustomMui";
import { IconButton } from "@mui/material";

function ShowtimeEmpty(props) {
  const { control, listRoom, id, errors, listRoomFilm, setListroomFilm } =
    props;
  return (
        <div>
            
        </div>
  );
}

export default ShowtimeEmpty;
