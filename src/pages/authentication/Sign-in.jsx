import { Button, TextField } from '@mui/material'
import React from 'react'

const SignIn = () => {
    return (
        <>
            <TextField size='small' fullWidth label="Username" variant="outlined" margin="normal"/>
            <TextField size='small' fullWidth label="Username" variant="outlined" margin="normal"/>
            <Button fullWidth variant="contained" color="primary"
                sx={{ mt: 2, width: "70%" }}>
                Login
            </Button>
        </>
    )
}

export default SignIn