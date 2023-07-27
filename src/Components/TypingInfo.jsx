import react from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { darkBackgroundColor, darkBorder, darkSecondaryColor, lightBorder, lightSecondaryBG } from "../theme";

const TypingInfo = ({ cpm, accuracy, error, record, timer }) => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";
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
        color: `${isDarkTheme ? "white" : ""}`,
        backgroundColor: `${isDarkTheme ? darkSecondaryColor : lightSecondaryBG}`,
      }}
    >
      <Box sx={{ fontFamily: "verdana", fontSize: "small"  }}>
        <Typography
          sx={{ opacity: 0.5, fontSize: "0.7rem" }}
        >{`Time`}</Typography>
        {`${timer}`}
      </Box>
      <Box sx={{ fontFamily: "verdana", fontSize: "small"  }}>
        <Typography sx={{ opacity: 0.5, fontSize: "0.7rem" }}>Speed</Typography>
        {`${cpm} s/m`}
      </Box>
      <Box sx={{ fontFamily: "verdana", fontSize: "small"  }}>
        <Typography
          sx={{ opacity: 0.5, fontSize: "0.7rem" }}
        >{`Record`}</Typography>
        {`${record} s/m`}
      </Box>
      <Box sx={{ fontFamily: "verdana", fontSize: "small"  }}>
        <Typography
          sx={{ opacity: 0.5, fontSize: "0.7rem" }}
        >{`Error`}</Typography>
        {`${error}`}
      </Box>
      <Box sx={{ fontFamily: "verdana", fontSize: "small" }}>
        <Typography
          sx={{ opacity: 0.5, fontSize: "0.7rem" }}
        >{`Accuracy`}</Typography>
        {`${accuracy} %`}
      </Box>
    </Box>
  );
};

export default TypingInfo;
