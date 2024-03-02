"use client"
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export default function SnackbarAlert({ autohide, handleClose = () => { }, title, message, open, severity = "error" }) {
    return (
        <Snackbar open={open} autoHideDuration={autohide ? 6000 : null} onClose={handleClose} sx={{width:"100%"}}>
            <Alert variant="filled" severity={severity} onClose={handleClose}>
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    )
}