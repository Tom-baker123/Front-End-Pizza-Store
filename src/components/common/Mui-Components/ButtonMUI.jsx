import React from 'react'
import { Stack } from '@mui/material'
import { Button } from '@mui/material'

const ButtonMUI = ({children, variant, onClick}) => {
  return (
    <Stack spacing={1} direction="row">
        <Button onClick={onClick} variant={variant}>{children}</Button>
    </Stack>
  )
}

export default ButtonMUI