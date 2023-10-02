'use client'
import React from 'react'
import Image from 'next/image';
import './styles.scss'
import Stepper from '@/app/components/stepper';

import Button from '@/app/components/button';
import Heading from '@/app/components/heading';
import AddDetails from './addDetails';
import PhotosAndVideos from './photosAndVideos';
import PricingAndPost from './pricingAndPost';

export default ({ params: { type } }) => {
    const [activeStep, changeStep] = React.useState(0);
    const [formData, setFormData] = React.useState({ propertyType: "", society: "", locality: "", rentOrSale: "", city: "", bhkType: "", builtUpArea: "", constructionStatus: "", furnishType: "", images: [], price: "" });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const postProperty =()=> {

    }

    const getStepForm = () => {
        switch (activeStep) {
            case 0: return <AddDetails formData={formData} handleChange={handleChange} changeStep={changeStep}/>;
            case 1: return <PhotosAndVideos formData={formData} handleChange={handleChange} changeStep={changeStep}/>;
            case 2: return <PricingAndPost formData={formData} handleChange={handleChange} postProperty={postProperty}/>
        }
    }
    const STEPS = ["Property Details", "Photos and Videos", "Pricing and Post"]
    return (<div className='post-property-form container-fluid'>
        <div className='heading text-center'>Post a {type} Property</div>
        <div className='sub-info text-center'>If you want to post Commercial Property Click here</div>
        <div className='additional-page-padding steps'>
            <Stepper steps={STEPS} activeStep={activeStep} />
            {getStepForm()}
        </div>
    </div>)
}