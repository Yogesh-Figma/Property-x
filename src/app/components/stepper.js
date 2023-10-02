"use client"
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 25,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#DC143C',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#DC143C',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#D3D3D3',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')(({ ownerState }) => ({
    zIndex: 2,
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: "#D3D3D3",
    overflow: "hidden",
    color: "#202124"
    ,
    ...(ownerState.active && {
        backgroundColor: '#DC143C',
        color: "#fff"
    }),
    '& .QontoStepIcon-circle': {
    },
    '&.completed': {
        backgroundColor: '#DC143C',
        color: "#fff"
    },
}));

function QontoStepIcon(props) {
    const { active, completed, className, icon } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className + (completed ? " completed" : "") + ' d-flex align-items-center justify-content-center '}>
            <div className={`QontoStepIcon-circle`}>{icon}</div>
        </QontoStepIconRoot>
    );
}


export default function CustomizedSteppers({ steps, activeStep }) {
    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={QontoStepIcon} sx={{ '& .MuiStepLabel-label':{"color":"#4D5156", "fontFamily": "var(--microsoft-sans-font),", "marginTop":"10px", "fontWeight":"400","fontSize":"16px"}}}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}