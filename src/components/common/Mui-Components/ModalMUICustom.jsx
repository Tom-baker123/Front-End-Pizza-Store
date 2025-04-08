import React, { createContext, useContext, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ButtonMUI from './ButtonMUI';


const ModalMUICustom = ({children, nameButton, variant, open, onOpen, onClose}) => {
    // Rất quan trọng phải nhớ thêm để giữ focus trong modal
    const dialogRef = useRef(null); // Tạo ref cho dialog

    useEffect(() => {
        if (open && dialogRef.current) { 
            dialogRef.current.focus();
        }
    }, [open]);

    return (
        <div>
            {/* Nút để mở modal */}
            <ButtonMUI onClick={onOpen} variant={variant}>{nameButton}</ButtonMUI>

            {/* Modal Dialog */}
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ m: 0, paddingBottom: "0px  ", display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: "row-reverse" }}>
                    <IconButton onClick={onClose} sx={{ color: 'grey.500' }}>
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


