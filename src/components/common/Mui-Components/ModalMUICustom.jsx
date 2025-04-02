import React from 'react'
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ButtonMUI from './ButtonMUI';

const ModalMUICustom = ({children, nameButton, variant}) => {
    // State để điều khiển modal
    const [open, setOpen] = useState(false);

    // Hàm mở modal
    const handleClickOpen = () => setOpen(true);

    // Hàm đóng modal
    const handleClose = () => setOpen(false);

    return (
        <div>
            {/* Nút để mở modal */}
            <ButtonMUI onClick={handleClickOpen} variant={variant}>{nameButton}</ButtonMUI>

            {/* Modal Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ m: 0, paddingBottom: "0px  ", display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: "row-reverse" }}>
                    <IconButton onClick={handleClose} sx={{ color: 'grey.500' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ marginBottom: '20px' }}>
                    {children}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ModalMUICustom