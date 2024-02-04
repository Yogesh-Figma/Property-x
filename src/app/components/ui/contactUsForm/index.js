'use client'

import React from 'react'
import "./styles.scss"
import Input from '@/app/components/input';
import Button from '@/app/components/button';
import { useForm } from "react-hook-form";
import { postContactUsForm } from '@/clients/contactUsClient';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const ContactUsForm = () => {
    const [formData, setFormData] = React.useState({ name: "", email: "", mobile: "", message: "" });
    const [open, setOpen] = React.useState(false);
    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => {
            return formData;
        }, [formData])
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name == "mobile" && ((value != "" && !/^\d+$/.test(value)) || value.length > 10)) {
            return;
        }
        setValue(name, value);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const submitContactUsForm = async () => {
        await postContactUsForm(formData);
        setOpen(true);
    }

    return (<div className='contact-us-form'>
        <Input
            control={control}
            rounded={true}
            width={"100%"}
            required={true}
            errorMessage={"Required"}
            className='contact-form-input'
            label={"Full Name"}
            name="name"
            value={formData.name}
            onChange={handleChange}
            height={29}
        />
        <Input
            control={control}
            rounded={true}
            width={"100%"}
            required={true}
            errorMessage={"Required"}
            className='contact-form-input'
            label={"Email Address"}
            name="email"
            value={formData.email}
            onChange={handleChange}
            height={29}
        />
        <Input
            control={control}
            type={"tel"}
            rounded={true}
            width={"100%"}
            required={true}
            errorMessage={"Required"}
            className='contact-form-input'
            label={"Mobile Number"}
            name="mobile"
            minLength={10}
            maxLength={10}
            isNumber={true}
            value={formData.mobile}
            onChange={handleChange}
            height={29}
        />
        <Input
            control={control}
            minRows={5}
            width={"100%"}
            errorMessage={"Required"}
            className='contact-form-message-input'
            label={"Message/Query"}
            name="message"
            required={true}
            multiline={true}
            value={formData.message}
            onChange={handleChange}
            height={108}
        />
        <div className='consent-message body-txt'>"I consent to sharing my personal information for the purpose of contacting the support team at Go Propify. I understand that my information will be used exclusively for addressing my query and will adhere to the website's Privacy Policy."</div>
        <div className='d-flex support-btn-container justify-content-between'>
            <Button rounded={true} height={30} text={"Send Query"} onClick={handleSubmit(submitContactUsForm, () => { })} />
            <Button rounded={true} height={30} text={"Schedule Virtual Consultation"} onClick={handleSubmit(submitContactUsForm, () => { })}/>
        </div>
        <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
            <Alert
                onClose={() => setOpen(false)}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}>
                <AlertTitle>Success</AlertTitle>
                Your request was registered successfully. Our agent will get back to you soon.
            </Alert>
        </Snackbar>
    </div>)
}

export default ContactUsForm;