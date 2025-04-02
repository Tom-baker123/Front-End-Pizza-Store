import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FoodItemDetail from '../../layout/FoodItemDetail';

const ModalMUI = ({children, food}) => {
  // State để điều khiển modal
  const [open, setOpen] = useState(false);

  // Hàm mở modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Hàm đóng modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* Nút để mở modal */}
      <div onClick={handleClickOpen}>
        {children}          
      </div>
      

      {/* Modal Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ m: 0, paddingBottom: "0px  ", display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: "row-reverse" }}>
          <IconButton onClick={handleClose} sx={{ color: 'grey.500' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{marginBottom: '20px'}}>
          <FoodItemDetail food={food}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalMUI;
