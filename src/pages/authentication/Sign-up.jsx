import { Button, TextField } from '@mui/material'
import React from 'react'

const SignUp = () => {
    return (
        <>
            <TextField size='small' fullWidth label="Full Name" variant="outlined" margin="normal"/>
            <TextField size='small' fullWidth label="Phone" variant="outlined" margin="normal"/>
            <TextField size='small' fullWidth label="Address" variant="outlined" margin="normal"/>
            <TextField size='small' fullWidth label="Email" variant="outlined" margin="normal"/>
            <TextField size='small' fullWidth label="Password" variant="outlined" margin="normal"/>
            <TextField size='small' fullWidth label="Confirm Password" variant="outlined" margin="normal"/>
            <Button fullWidth variant="contained" color="primary"
                sx={{ mt: 2, width: "70%" }}>
                Sign Up
            </Button>
        </>
    )
}

export default SignUp