import React from "react";
import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import { darkBackgroundColor, darkBorder, lightBackgroundColor, lightSecondaryBG, lightSecondaryColor } from "../theme";

const ModalResult = ({ visibleModal, closeModal, cpm, accuracy, error }) => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";
  return (
    <Modal open={visibleModal} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: `${isDarkTheme ? darkBackgroundColor : lightBackgroundColor}`,
          borderRadius: "10px",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography sx={{ marginTop: 1 }} variant="h4" gutterBottom>
          Твои результаты
        </Typography>
        <Typography variant="body1" gutterBottom>
          Скорость: {`${cpm} s/m`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Точность: {`${accuracy}%`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Количество ошибок: {error}
        </Typography>
        {/* <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}> */}
        <Button
          sx={{
            marginY: 2, border: darkBorder,
            color: `${isDarkTheme ? "white" : "black"}`,
            borderRadius: "10px",
          }}
          onClick={closeModal}
          variant="outlined"
        >
          Начать заново
        </Button>
        {/* </Box> */}
      </Box>
    </Modal>
  );
};

export default ModalResult;
