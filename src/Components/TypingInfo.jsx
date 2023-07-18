import react from "react";
import { Box, Typography } from "@mui/material"

const TypingInfo = ({ cpm, accuracy, error, record, timer }) => {
  return (
    <Box
      sx={{
        width: "20%",
        border: 1,
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 1,
      }}
    >
      <Typography sx={{ opacity: 0.5 }}>{`time`}</Typography>
      <Typography>{`${timer}`}</Typography>
      <Typography sx={{ opacity: 0.5 }}>{`record`}</Typography>
      <Typography>{`${record}`}</Typography>
      <Typography sx={{ opacity: 0.5 }}>{`speed`}</Typography>
      <Typography>{`${cpm} s/m`}</Typography>
      <Typography sx={{ opacity: 0.5 }}>{`error`}</Typography>
      <Typography>{`${error}`}</Typography>
      <Typography sx={{ opacity: 0.5 }}>{`accuracy`}</Typography>
      <Typography>{`${accuracy}%`}</Typography>
    </Box>
  );
};

export default TypingInfo;
