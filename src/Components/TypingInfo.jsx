import react from "react";
import { Box, Typography } from "@mui/material";

const TypingInfo = ({ cpm, accuracy, error, record, timer }) => {
  return (
    <Box
      sx={{
        width: "15%",
        border: 1,
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "full",
        gap: 1,
        padding: 2,
        paddingRight: 3,
      }}
    >
      <Box>
        <Typography
          sx={{ opacity: 0.5, fontSize: "0.7rem" }}
        >{`Time`}</Typography>
        {`${timer}`}
      </Box>
      <Box>
        <Typography
          sx={{ opacity: 0.5, fontSize: "0.7rem" }}
        >Speed</Typography>
        {`${cpm} s/m`}
      </Box>
      <Box>
        <Typography
          sx={{ opacity: 0.5, fontSize: "0.7rem" }}
        >{`Record`}</Typography>
        {`${record} s/m`}
      </Box>
      <Box>
        <Typography
          sx={{ opacity: 0.5, fontSize: "0.7rem" }}
        >{`Error`}</Typography>
        {`${error}`}
      </Box>
      <Box>
        <Typography
          sx={{ opacity: 0.5, fontSize: "0.7rem" }}
        >{`Accuracy`}</Typography>
        {`${accuracy} %`}
      </Box>
    </Box>
  );
};

export default TypingInfo;
