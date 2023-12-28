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
import { getPropertyPostData } from '@/clients/propertyClient';
import { signIn, signOut, useSession } from "next-auth/react";


const sampleRequest = {
    "propertyAddress": {
      "cityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "countryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "stateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "localityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    "propertyImages": {
      "image1": "string",
      "image2": "string",
      "image3": "string",
      "image4": "string",
      "image5": "string",
      "image6": "string",
      "image7": "string",
      "image8": "string",
      "image9": "string",
      "image10": "string",
      "image11": "string",
      "image12": "string",
      "image13": "string",
      "image14": "string",
      "image15": "string",
      "image16": "string",
      "image17": "string",
      "image18": "string",
      "image19": "string",
      "image20": "string"
    },
    "propertyFeatureedStatus": "FEATURED",
    "propertyTourVideo": "string",
    "propertyTypeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6", // done
    "propertyConfigurationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6", //done
    "propertyStatusId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "propertyPossessionStatus": "string",
    "propertyPossessionDue": "string",
    "propertySuperArea": "string",
    "propertyCoveredArea": "string",
    "propertyAreaUnits": "string",
    "propertyDeveloperId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "propertyAmenities": "string",
    "propertySpecification": "string",
    "propertyProject": "string",
    "propertyProjectUnitId": "string",
    "propertyTower": "string",
    "propertyFloor": "string",
    "isProjectInventory": "string",
    "propertyFurnishingStatusId": "3fa85f64-5717-4562-b3fc-2c963f66afa6", // done
    "propertyListingTypeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6", //done
    "propertyBookingToken": "string",
    "listingBy": "string",
    "propertyNearbyLandmarks": "string",
    "propertyRatePerAreaUnit": "string",
    "propertyOtherChargesPerAreaUnit": "string"
  }
export default ({ params: { type } }) => {
    const [activeStep, changeStep] = React.useState(0);
    const [formData, setFormData] = React.useState({ propertyListingTypeId: "", society: "", localityId: "", rentOrSale: "", city: "", propertyConfigurationId: "", builtUpArea: "", constructionStatus: "", propertyFurnishingStatusId: "", images: [], price: "" });
    const [formInputFields, setFormInputFields] = React.useState({ propertyListingTypes: [], lookingTo: [], propertyConfigurations: [], constructionStatus: [], propertyFurnishingStatuses: [], localities:[] });
    const { data: session } = useSession();

    // await mapFormInputKeys();

    React.useEffect(() => {
        async function mapFormInputKeys() {
            const { propertyConfigurations, furnishingStatus, possessionStatus, propertyType, propertyListingType, localities } = await getPropertyPostData(session?.token);
            let formInputData = { propertyListingTypes: [], lookingTo: [], propertyConfigurations: [], constructionStatus: [], propertyFurnishingStatuses: [] };
            formInputData.propertyListingTypes = propertyListingType.map(item => { return { label: item.name, value: item.id } });
            formInputData.propertyConfigurations = propertyConfigurations.map(item => { return { label: item.name, value: item.id } });
            formInputData.constructionStatus = possessionStatus.map(item => { return { label: item.name, value: item.id } });
            formInputData.propertyFurnishingStatuses = furnishingStatus.map(item => { return { label: item.name, value: item.id } });
            formInputData.localities = localities.map(item => { return { label: item.name, value: item.id } });
            setFormInputFields(formInputData);
        }
        mapFormInputKeys();
        return () => { }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const postProperty = () => {

    }

    const getStepForm = () => {
        switch (activeStep) {
            case 0: return <AddDetails formData={formData}
                handleChange={handleChange}
                changeStep={changeStep}
                propertyListingTypes={formInputFields.propertyListingTypes}
                propertyConfigurations={formInputFields.propertyConfigurations}
                constructionStatus={formInputFields.constructionStatus}
                propertyFurnishingStatuses={formInputFields.propertyFurnishingStatuses} 
                localities={formInputFields.localities}/>
            case 1: return <PhotosAndVideos formData={formData} handleChange={handleChange} changeStep={changeStep} />;
            case 2: return <PricingAndPost formData={formData} handleChange={handleChange} postProperty={postProperty} />
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