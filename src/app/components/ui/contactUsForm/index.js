'use client'

import React from 'react'
import "./styles.scss"
import Input from '@/app/components/input';
import Button from '@/app/components/button';

const ContactUsForm = () => {
    const [formData, setFormData] = React.useState({ fullName: "", emailAddress: "", mobileNumber: "", message: "" });
    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name == "mobileNumber" && ((value != "" && !/^\d+$/.test(value)) || value.length > 10)) {
            return;
        }
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
    
    return (<div className='contact-us-form'>
        <Input
            rounded={true}
            width={"100%"}
            className='contact-form-input'
            label={"Full Name"}
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            height={29}
        />
        <Input
            rounded={true}
            width={"100%"}
            className='contact-form-input'
            label={"Email Address"}
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            height={29}
        />
        <Input
            type={"tel"}
            rounded={true}
            width={"100%"}
            className='contact-form-input'
            label={"Mobile Number"}
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            height={29}
        />
        <Input
            minRows={5}
            width={"100%"}
            className='contact-form-message-input'
            label={"Message/Query"}
            name="message"
            multiline={true}
            value={formData.message}
            onChange={handleChange}
            height={108}
        />
        <div className='consent-message body-txt'>"I consent to sharing my personal information for the purpose of contacting the support team at Go Propify. I understand that my information will be used exclusively for addressing my query and will adhere to the website's Privacy Policy."</div>
        <div className='d-flex support-btn-container justify-content-between'>
            <Button rounded={true} height={30} text={"Send Query"}/>
            <Button rounded={true} height={30} text={"Schedule Virtual Consultation"}/>
        </div>
    </div>)
}

export default ContactUsForm;