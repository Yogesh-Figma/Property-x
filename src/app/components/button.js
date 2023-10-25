'use client'
import { useState } from 'react'
import { Button as MIUIButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function Button({ variant = "contained", text, icon, className, rounded, height, onClick, endIcon, startIcon, type }) {
    const BootstrapButton = styled(MIUIButton)({
        display:"inline-flex",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: variant == "contained"? "#DC143C":"fff",
        textTransform: "capitalize",
        fontFamily: "var(--helvetica-bold-font)",
        lineHeight: "unset",
        borderRadius: rounded ? (height / 2) : null,
        height: height,
        color: variant == "contained"? "#fff":"#DC143C",
        borderColor:variant == "contained"? "#fff":"#DC143C",
        textTransform:"none",
        boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.25)",
        fontWeight:700,
        '&:hover': {
            backgroundColor: variant == "contained"? "#C21437": "#DC143C",
            color: "#fff",
            borderColor:variant == "contained"? "#DC143C":"transparent",
        }
    })
    return (
        <BootstrapButton type={type} variant={variant} className={className} startIcon={icon} onClick={onClick} endIcon={endIcon}>{text}</BootstrapButton>
    )
}