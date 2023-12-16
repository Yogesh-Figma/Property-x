'use client'
import React from 'react'
import Image from 'next/image';
import './styles.scss'
import Stepper from '@/app/components/stepper';

import Button from '@/app/components/button';
import Heading from '@/app/components/heading';
import InventorySelection from './inventorySelection';
import PaymentAndBook from './paymentAndBook';
import PersonalDetails from './personalDetails';

const STEPS = ["Inventory Selection", "Personal Details", "Payment and Book"]

export default ({ params: { type } }) => {
    const [activeStep, changeStep] = React.useState(0);
    const [formData, setFormData] = React.useState({ tower: "", bhkType: "", floor: "", apartment: "", firstName:"", lastName:"", mobileNo:"", email:"", address:"", aadhaarNo:"", panNo:"", nomineeName:"", nomineeRelation:"", selectedPaymentMethod:"", declaration:false });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const paymentAndBook =()=> {

    }

    const getStepForm = () => {
        switch (activeStep) {
            case 0: return <InventorySelection formData={formData} handleChange={handleChange} changeStep={changeStep}/>;
            case 1: return <PersonalDetails formData={formData} handleChange={handleChange} changeStep={changeStep}/>;
            case 2: return <PaymentAndBook formData={formData} handleChange={handleChange} paymentAndBook={paymentAndBook}/>
        }
    }

    return (<div className='book-property-form container-fluid'>
        <div className='heading text-center'>Booking Information</div>
        <div className='sub-info text-center'>Provide the required information to Book this property now</div>
        <div className='additional-page-padding steps'>
            <Stepper steps={STEPS} activeStep={activeStep} />
            {getStepForm()}
        </div>
    </div>)
}