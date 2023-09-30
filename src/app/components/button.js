'use client'
import { useState } from 'react'
import { Button as MIUIButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function Button({ variant = "contained", text, icon, className, rounded, height, onClick, endIcon, startIcon }) {
    const BootstrapButton = styled(MIUIButton)({
        backgroundColor: variant == "contained"? "#DC143C":"fff",
        textTransform: "capitalize",
        fontFamily: "var(--helvetica-regular-font)",
        lineHeight: "unset",
        borderRadius: rounded ? (height / 2) : null,
        height: height,
        color: variant == "contained"? "#fff":"#DC143C",
        borderColor:variant == "contained"? "#fff":"#DC143C",
        textTransform:"none",
        '&:hover': {
            backgroundColor: variant == "contained"? "#C21437": "#DC143C",
            color: "#fff",
            borderColor:variant == "contained"? "#DC143C":"#fff",
        }
    })
    return (
        <BootstrapButton variant={variant} className={className} startIcon={icon} onClick={onClick} endIcon={endIcon}>{text}</BootstrapButton>
    )
}