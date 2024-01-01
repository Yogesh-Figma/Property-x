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

export default ({ data, type }) => {
    const [activeStep, changeStep] = React.useState(0);
    const getPersonalDataFields = () => {
        return {
            firstName: "", lastName: "", mobileNo: "", email: "", aadhaarNo: "", panNo: "",
            nomineeName: "", nomineeRelation: "", coraddressline1: "",
            coraddressline2: "", corcountry: "", corstate: "", corcity: "", corzipcode: "",
            owner: false,
            peraddressline1: "", peraddressline2: "", percountry: "", perstate: "",
            percity: "", perzipcode: "",
            permanentAddressSame: false
        }
    }
    const [formData, setFormData] = React.useState({ declaration: false, tower: "", bhkType: "", floor: "", apartment: "", firstName: "", lastName: "", mobileNo: "", email: "", address: "", aadhaarNo: "", panNo: "", nomineeName: "", nomineeRelation: "", selectedPaymentMethod: "", declaration: false });
    const [personalData, setPersonalData] = React.useState([getPersonalDataFields()]);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handlePersonalDetails = (index, event) => {
        const { name, value } = event.target;
        let data = [...personalData];
        data[index][name] = value;
        setPersonalData(data);
    }

    const addOwner = () => {
        if (personalData.length < 3) {
            setPersonalData([...personalData, getPersonalDataFields()]);
        }
    }

    const paymentAndBook = () => {

    }

    const getStepForm = () => {
        switch (activeStep) {
            case 0: return <InventorySelection data={data} formData={formData} handleChange={handleChange} changeStep={changeStep} />;
            case 1: return <PersonalDetails addOwner={addOwner}
                data={data}
                personalData={personalData}
                handleFormChange={handleChange}
                declaration={formData.declaration}
                handlePersonalDetails={handlePersonalDetails}
                changeStep={changeStep} />;
            case 2: return <PaymentAndBook formData={formData} handleChange={handleChange} paymentAndBook={paymentAndBook} />
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