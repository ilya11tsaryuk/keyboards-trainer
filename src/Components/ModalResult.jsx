import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';


 
 
 const ModalResult = ({ visibleModal, closeModal, cpm, accuracy, error }) => {
    return (
        <Modal open={visibleModal} onClose={closeModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          textAlign: 'center'
        }}>
          <Typography variant="h5" gutterBottom>
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
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Button onClick={closeModal} variant='outlined'>
              Начать заново
            </Button>
          </Box>
        </Box>
      </Modal>
    )
 }

 export default ModalResult