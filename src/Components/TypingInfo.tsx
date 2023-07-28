import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { useTheme } from "@mui/material";
import { darkBorder, darkSecondaryColor, lightBorder, lightSecondaryBG } from "../theme";
import { getRecord } from "../constants";
import { ReduxType } from "./types";

const TypingInfo = () => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";
  const cpm = useSelector((state: ReduxType) => state.typing.cpm);
  const timer = useSelector((state: ReduxType) => state.typing.timer);
  const error = useSelector((state: ReduxType) => state.typing.error);
  const accuracy = useSelector((state: ReduxType) => state.typing.accuracy);
  const record = getRecord()

  const typingInfo = [
    { name: "Time", value: timer },
    { name: "Speed", value: cpm },
    { name: "Record", value: record },
    { name: "Error", value: error },
    { name: "Accuracy", value: accuracy },
  ]

  return (

    <Box
      sx={{
        width: "15%",
        border: isDarkTheme ? darkBorder : lightBorder,
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 1,
        padding: 2,
        paddingRight: 3,
        color: `${isDarkTheme ? "white" : "black"}`,
        backgroundColor: `${isDarkTheme ? darkSecondaryColor : lightSecondaryBG}`,
      }}
    >

      {typingInfo.map((info) => (
        <Box key={info.name} sx={{ fontFamily: "verdana", fontSize: "small" }}>
          <Typography
            sx={{ opacity: 0.5, fontSize: "0.7rem" }}
          >{info.name}</Typography>
          {info.value}
        </Box>
      ))}

    </Box>
  );
};

export default TypingInfo;
