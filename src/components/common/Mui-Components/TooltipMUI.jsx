import React from 'react'
import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

const TooltipMUI = styled(({ className, children, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} arrow>
        {children}
    </Tooltip>
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        fontSize: '1rem',
        padding: '12px 16px',
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: '8px',
        maxWidth: 300,
        boxShadow: theme.shadows[4],
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: '#333',
    },
}));

export default TooltipMUI