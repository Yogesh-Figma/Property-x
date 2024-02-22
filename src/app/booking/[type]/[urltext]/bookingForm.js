'use client'
import React from 'react'
import Image from 'next/image';
import './styles.scss'
import Stepper from '@/app/components/stepper';

import Button from '@/app/components/button';
import Heading from '@/app/components/heading';
import InventorySelection from './inventorySelection';
import PaymentAndBook from './paymentAndBook';
import PersonalDetails from './ownerDetails';

const STEPS = ["Personal Details", "Payment and Book"]

export default ({ data, type, configurations, projectTowers }) => {
    let isProperty = type.toLowerCase() == "property"
    const BOOKING_STEPS = isProperty ? STEPS : ["Inventory Selection", ...STEPS];
    const [activeStep, changeStep] = React.useState(isProperty ? 1 : 0);
    const getPersonalDataFields = () => {
        return {
            firstName: "", lastName: "", mobileNo: "", email: "", aadhaarNo: "", panNo: "",
            nomineeName: "", nomineeRelation: "",
            owner: false,
            permanentZipcode: "",
            presentZipcode:  "",
            presentAddressLine1: "",
            presentAddressLine2: "",
            permanentAddressLine1: "",
            permanentAddressLine2: "",
            permanentCityId: "",
            permanentLocalityId: "",
            permanentStateId: "",
            permanentCountryId: "",
            presentCityId: "",
            presentLocalityId: "",
            presentStateId: "",
            presentCountryId: "",
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
            case 0: return <InventorySelection 
            data={data}
             formData={formData} 
             handleChange={handleChange} 
             changeStep={changeStep}
             configurations={configurations} 
             projectTowers={projectTowers}
             />;
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
            <Stepper steps={BOOKING_STEPS} activeStep={activeStep} />
            {getStepForm()}
        </div>
    </div>)
}