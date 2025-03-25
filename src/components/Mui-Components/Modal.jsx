import React, { useState } from "react";
import { Modal, Box, Button, TextField, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MyButton from "./MyButton";
import SignIn from "../../pages/authentication/Sign-in";
import SignUp from "../../pages/authentication/Sign-up";

const LoginModal = ({ children, type }) => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      {!isLoggedIn ? (
        type === "Login" ? 
        (<MyButton variant={"outlined"} onClick={handleOpen}> Login </MyButton> ) 
        : 
        ( <MyButton variant={"contained"} onClick={handleOpen}> Sign Up </MyButton>)
      ) : (
        <Button variant="outlined" onClick={handleLogout}> Logout </Button>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 300, sm: 400 }, 
            bgcolor: "background.paper",
            boxShadow: 24, p: 3,borderRadius: 2,
            textAlign: "center",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h4">
            <div className="font-extrabold mt-1"> 
              {type}
            </div>
          </Typography>
          
          {/* Khu vực điền input */}
          {type === "Login" ? (
            <>
              <SignIn/>
            </>
          ) : (
            <>
              <SignUp/>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default LoginModal;
