import Image from 'next/image';
import './styles.scss'

import { getAllPropertyCategory, getPropertyPostData } from '@/clients/propertyClient';
import { getLocalityByCityId } from '@/clients/localityClient';
import { getProjectsByCityId } from '@/clients/projectClient';
import PostProperty from './postProperty';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"


const Page = async ({ params: { type } }) => {
    const session = await getServerSession(authOptions)
    const propertyCategories = await getAllPropertyCategory();
    const isResidential = type.toLowerCase() == "residential";
    const propertyCategoryId = (propertyCategories.find(item => (item.name||"").toLowerCase() == type.toLowerCase()) || {}).id;

    const { propertyConfigurationType, furnishingStatus, constructionStatus, propertyType, propertyListingType,
        cities, specifications, amenities, zones, ownerships, facings } = await getPropertyPostData(type, propertyCategoryId, session?.token);
    let formInputData = { propertyListingTypes: [], lookingTo: [], propertyConfigurations: [], constructionStatus: [], propertyFurnishingStatuses: [] };
    formInputData.propertyListingTypes = propertyListingType.map(item => { return { label: item.name, value: item.id } });
    formInputData.propertyConfigTypes = propertyConfigurationType.map(item => { return { label: item.name, value: item.id } });
    formInputData.constructionStatus = constructionStatus.map(item => { return { label: item.name, value: item.id } });
    formInputData.propertyFurnishingStatuses = furnishingStatus.map(item => { return { label: item.name, value: item.id } });
    formInputData.cities = cities.map(item => { return { label: item.name, value: item.id } });
    formInputData.specifications = specifications;
    formInputData.amenities = amenities;
    formInputData.zones = zones.map(item => { return { label: item.name, value: item.id } });
    formInputData.ownerships = ownerships;
    formInputData.facings = facings;
    formInputData.propertyType = propertyType.map(item => { return { label: item.name, value: item.id } });



    return (<PostProperty formInputData={formInputData} propertyCategoryId={propertyCategoryId} isResidential={isResidential} type={type}/>)
}

export default Page;