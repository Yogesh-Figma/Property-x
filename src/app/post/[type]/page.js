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
import { useQuery } from 'react-query';
import { getLocalityByCityId } from '@/clients/localityClient';
import { getProjectsByCityId } from '@/clients/projectClient';

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

const COUNTS = [...Array(20).keys()].map(i => {
    let value = ('0' + (i + 1)).slice(-2);
    return { label: value, value };
});

const PROPERY_FACINGS = [{ label: "NORTH", value: "NORTH" }, { label: "SOUTH", value: "SOUTH" },
{ label: "EAST", value: "EAST" },
{ label: "WEST", value: "WEST" }, {label: "NORTH-EAST", value: "NORTH-EAST"},
{label: "NORTH-WEST", value: "NORTH-WEST"},{label: "SOUTH-EAST", value: "SOUTH-EAST"},
{label: "SOUTH-WEST", value: "SOUTH-WEST"}]

export default ({ params: { type } }) => {
    const [activeStep, changeStep] = React.useState(0);
    const [formData, setFormData] = React.useState({
        propertyListingTypeId: "",
        society: "", localityId: "", rentOrSale: "", city: "",
        propertyConfigurationId: "", builtUpArea: "",
        constructionStatus: "", propertyFurnishingStatusId: "",
        images: [], price: "", amenities: [], specifications: [],
        specificationCount: 0, specificationId: "",
        amenityId: "", amenitiesCount: 0
    });
    const [formInputFields, setFormInputFields] = React.useState({
        propertyListingTypes: [], lookingTo: [], propertyConfigurations: [],
        constructionStatus: [], propertyFurnishingStatuses: [], cities: []
    });
    const { data: session } = useSession();

    // await mapFormInputKeys();

    React.useEffect(() => {
        async function mapFormInputKeys() {
            const { propertyConfigurations, furnishingStatus, possessionStatus, propertyType, propertyListingType, cities, specifications, amenities } = await getPropertyPostData(session?.token);
            let formInputData = { propertyListingTypes: [], lookingTo: [], propertyConfigurations: [], constructionStatus: [], propertyFurnishingStatuses: [] };
            formInputData.propertyListingTypes = propertyListingType.map(item => { return { label: item.name, value: item.id } });
            formInputData.propertyConfigurations = propertyConfigurations.map(item => { return { label: item.name, value: item.id } });
            formInputData.constructionStatus = possessionStatus.map(item => { return { label: item.name, value: item.id } });
            formInputData.propertyFurnishingStatuses = furnishingStatus.map(item => { return { label: item.name, value: item.id } });
            formInputData.cities = cities.map(item => { return { label: item.name, value: item.id } });
            formInputData.specifications = specifications;
            formInputData.amenities = amenities
            setFormInputFields(formInputData);
        }
        mapFormInputKeys();
        return () => { }
    }, []);


    let { data: localities = [] } = useQuery({ enabled: !!formData.cityId, queryKey: ['getLocalityByCityId', formData.cityId], queryFn: () => getLocalityByCityId(formData.cityId) });
    const { data: projects = [] } = useQuery({ enabled: !!formData.cityId, queryKey: ['getProjectsByCityId', formData.cityId], queryFn: () => getProjectsByCityId(formData.cityId, session?.token) });
    const localityData = React.useMemo(() => localities.map(item => { return { label: item.name, value: item.id } }), [localities.length, formData.cityId])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const postProperty = () => {

    }

    const addSpecification = () => {
        const selectedSpecification = formInputFields.specifications.find(e => e.id == formData.specificationId) || {};
        setFormData((prevFormData) => ({ ...prevFormData, specifications: [...formData.specifications, { specification: formData.specificationId, id: new Date().getTime(), count: formData.specificationCount, name: selectedSpecification.name }] }));
    }

    const removeSpecification = (id) => {
        const filteredSpecifications = formData.specifications.filter(x => x.id != id);
        setFormData((prevFormData) => ({ ...prevFormData, specifications: filteredSpecifications }));
    }

    const addAmenity = () => {
        const selectedAmenity = formInputFields.amenities.find(e => e.id == formData.amenityId) || {};
        setFormData((prevFormData) => ({ ...prevFormData, amenities: [...formData.amenities, { amenity: formData.amenityId, id: new Date().getTime(), count: formData.amenitiesCount, name: selectedAmenity.name }] }));
    }

    const removeAmenity = (id) => {
        const filteredAmenities = formData.amenities.filter(x => x.id != id);
        setFormData((prevFormData) => ({ ...prevFormData, amenities: filteredAmenities }));
    }

    const getStepForm = () => {
        switch (activeStep) {
            case 0: return <AddDetails formData={formData}
                counts={COUNTS}
                handleChange={handleChange}
                changeStep={changeStep}
                cities={formInputFields.cities}
                propertyListingTypes={formInputFields.propertyListingTypes}
                propertyConfigurations={formInputFields.propertyConfigurations}
                constructionStatus={formInputFields.constructionStatus}
                propertyFurnishingStatuses={formInputFields.propertyFurnishingStatuses}
                addSpecification={addSpecification}
                addAmenity={addAmenity}
                removeAmenity={removeAmenity}
                removeSpecification={removeSpecification}
                specifications={formInputFields.specifications}
                amenities={formInputFields.amenities}
                localities={localityData}
                projects={projects} 
                propertyFacings = {PROPERY_FACINGS}/>
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