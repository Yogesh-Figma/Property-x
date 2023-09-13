'use client'
import { useState } from 'react'
import { Button as MIUIButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function Button({ variant = "contained", text, icon, className, rounded, height, onClick, endIcon }) {
    const BootstrapButton = styled(MIUIButton)({
        backgroundColor:"#DC143C",
        textTransform:"capitalize",
        fontFamily:"var(--helvetica-regular-font)",
        lineHeight:"unset",
        borderRadius: rounded ? (height/2):null,
        height:height
    })
    return (
        <BootstrapButton variant={variant} className={className} startIcon={icon} onClick={onClick} endIcon={endIcon}>{text}</BootstrapButton>
    )
}