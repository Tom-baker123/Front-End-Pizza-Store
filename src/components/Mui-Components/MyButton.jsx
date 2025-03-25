import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Button.css';

export default function MyButton({ onClick, variant, children }) {
  

  return (
    
      <Stack spacing={2} direction="row" sx={{backgroundColor: "transparent"}}>
        {/* variant = "text", "outlined", "contained"; */}
        <Button variant={variant} onClick={onClick}>
          {children}
        </Button>
      </Stack>
  );
}