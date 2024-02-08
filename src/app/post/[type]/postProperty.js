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
import { getPropertyPostData, postProperty, getPropertyConfigurationByType } from '@/clients/propertyClient';
import { signIn, signOut, useSession } from "next-auth/react";
import { useQuery } from 'react-query';
import { getLocalityByCityId } from '@/clients/localityClient';
import { getProjectsByCityId } from '@/clients/projectClient';
import SuccessPage from './successPage';

const COUNTS = [...Array(20).keys()].map(i => {
    let value = ('0' + (i + 1)).slice(-2);
    return { label: value, value };
});

export default ({ type, formInputData, propertyCategoryId, isResidential }) => {
    const [activeStep, changeStep] = React.useState(0);
    const [images, setImages] = React.useState([]);
    const [formData, setFormData] = React.useState({
        propertyConfigType: "",
        propertyListingTypeId: "",
        society: "", localityId: "", rentOrSale: "", city: "",
        propertyConfigurationId: "", builtUpArea: "",
        constructionStatus: "", propertyFurnishingStatusId: "",
        images: [], price: "", amenities: [], specifications: [],
        specificationCount: 0, specificationId: "",
        amenityId: "", amenitiesCount: 0, facing: ""
    });
    const { data: session } = useSession();

    const getProjectsDataByCityId = async () => {
        const data = await getProjectsByCityId(formData.cityId, session?.token);
        return data.map(item => { return { label: item.name, value: item.id } });
    }

    let { data: localities = [] } = useQuery({ enabled: !!formData.cityId, queryKey: ['getLocalityByCityId', formData.cityId], queryFn: () => getLocalityByCityId(formData.cityId) });
    const { data: projects = [] } = useQuery({ enabled: !!formData.cityId, queryKey: ['getProjectsByCityId', formData.cityId], queryFn: () => getProjectsDataByCityId() });
    const { data: projectConfigurations = [] } = useQuery({
        enabled: !!formData.propertyConfigType && !!formData.propertyProjectId, queryKey: ['getPropertyConfigurationByType', formData.propertyConfigType, formData.propertyProjectId],
        queryFn: () => getPropertyConfigurationByType(formData.propertyConfigType, formData.propertyProjectId, session?.token)
    });
    const localityData = React.useMemo(() => localities.map(item => { return { label: item.name, value: item.id } }), [localities.length, formData.cityId])
    const projectConfigurationsData = React.useMemo(() => projectConfigurations.map(item => { return { label: item.sizeInSqft, value: item.id, specifications: item.specifications } }),
        [projectConfigurations.length, formData.propertyProjectId])


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name == "propertyConfigurationId") {
            let selectedSpecifications = projectConfigurationsData.find(item => item.value == value).specifications || [];
            selectedSpecifications = selectedSpecifications.map(item => { return { ...item, specification: item.specificationsId } })
            setFormData((prevFormData) => ({ ...prevFormData, specifications: selectedSpecifications }));
        }
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const uploadFile = async (files) => {
        const formData = new FormData();
        for (let file of files) {
            formData.append("files", file);
        }
        formData.append("userId", session.user.id);
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
        return response.json();
    }


    const post = async () => {
        let imagesUrl = [];
        if (!!images && images.length > 0) {
            const res = await uploadFile(images);
            imagesUrl = res;
        }

        const requestObj = {
            "localityId": formData.localityId,
            "propertyConfigurationId": formData.propertyConfigurationId,
            "propertyFurnishingStatusId": formData.propertyFurnishingStatusId,
            "propertyListingTypeId": formData.propertyListingTypeId,
            "propertyConfigType": formData.propertyConfigType,
            "constructionStatusId": formData.constructionStatus,
            "facing": formData.facing,
            "amenities": formData.amenities,
            "ratePerUnitInsqft": formData.price,
            "sizeInSqft": formData.builtUpArea,
            "age": formData.age,
            "specifications": formData.specifications,
            "ownership": formData.ownership,
            "zoneTypeId": formData.zoneTypeId,
            "propertyProjectId": formData.propertyProjectId,
            "images": imagesUrl,
            "propertyTypeId": formData.propertyTypeId

            // "propertyStatusId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            // "propertyPossessionStatusId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            // "propertyFloorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            // "propertyProjectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            // "propertyDeveloperId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            // "propertyFloorPlanId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            // "propertyFaq": "string",
            // "lockinPeriod": "string",
            // "maintenanceCharge": 0,
            // "faqs": [
            //   {
            //     "questions": "string",
            //     "answers": "string"
            //   }
            // ],

            // "propertyConfigurationName": "string",
            // "propertyConfigType": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            // "floorPlanImage": "string",
            // "zoneTypeName": "string",
            // "name": "string",
            // "description": "string",
            // "address": "string",
            // "latitude": "string",
            // "longitude": "string",
            // "possessionDue": "string",
            // "superArea": 0,
            // "coveredArea": 0,
            // "areaUnits": "string",
            // "unitId": "string",
            // "nearbyLandmarks": "string",
            // "isInventory": "string",
            // "tourVideo": "string",
            // "bookingToken": "string",
            // "leaseDuration": "string",
            // "otherChargesPerUnitSqft": 0,
            // "discount": "string",
            // "paymentSchedule": "string",
            // "highlights": [
            //   "string"
            // ],

            // "featuredStatus": "FEATURED",
            // "logo": "string"
        }
        await postProperty(session.user.id, requestObj, session.token);
        changeStep(3);

    }

    const addSpecification = () => {
        const selectedSpecification = formInputData.specifications.find(e => e.id == formData.specificationId) || {};
        let filteredSpecifications = formData.specifications.filter(item => item.specification != formData.specificationId);
        filteredSpecifications.push({ specification: formData.specificationId, count: Number(formData.specificationCount), name: selectedSpecification.name });
        setFormData((prevFormData) => ({ ...prevFormData, specifications: filteredSpecifications }));
    }

    const removeSpecification = (id) => {
        const filteredSpecifications = formData.specifications.filter(x => x.specification != id);
        setFormData((prevFormData) => ({ ...prevFormData, specifications: filteredSpecifications }));
    }

    const addAmenity = () => {
        const selectedAmenity = formInputData.amenities.find(e => e.id == formData.amenityId) || {};
        let filteredAmenities = formData.amenities.filter(item => item.amenity != formData.amenityId);
        filteredAmenities.push({ amenity: formData.amenityId, count: Number(formData.amenitiesCount), name: selectedAmenity.name });
        setFormData((prevFormData) => ({ ...prevFormData, amenities: filteredAmenities }));
    }

    const removeAmenity = (id) => {
        const filteredAmenities = formData.amenities.filter(x => x.amenity != id);
        setFormData((prevFormData) => ({ ...prevFormData, amenities: filteredAmenities }));
    }

    const getStepForm = () => {
        switch (activeStep) {
            case 0: return <AddDetails formData={formData}
                counts={COUNTS}
                handleChange={handleChange}
                changeStep={changeStep}
                propertyType={formInputData.propertyType}
                cities={formInputData.cities}
                propertyListingTypes={formInputData.propertyListingTypes}
                propertyConfigTypes={formInputData.propertyConfigTypes}
                constructionStatus={formInputData.constructionStatus}
                propertyFurnishingStatuses={formInputData.propertyFurnishingStatuses}
                addSpecification={addSpecification}
                addAmenity={addAmenity}
                removeAmenity={removeAmenity}
                removeSpecification={removeSpecification}
                specifications={formInputData.specifications}
                amenities={formInputData.amenities}
                localities={localityData}
                projects={projects}
                propertyFacings={formInputData.facings}
                zones={formInputData.zones}
                ownerships={formInputData.ownerships}
                isResidential={isResidential}
                projectConfigurationsData={projectConfigurationsData}
            />
            case 1: return <PhotosAndVideos setImages={setImages} formData={formData} handleChange={handleChange} changeStep={changeStep} images={images} />;
            case 2: return <PricingAndPost formData={formData} handleChange={handleChange} postProperty={post} />
            case 3: return <SuccessPage />
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