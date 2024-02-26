
"use client"
import React from "react";
import Card from "@/app/components/card";
import FormTabs from "@/app/components/formTabs";
import Image from "next/image";
import DropDown from '@/app/components/dropDown';
import Heading from '@/app/components/heading';
import PaymentSummary from './paymentSummary';
import { PropertyCard4 } from "@/app/components/ui/propertyCard";
import Button from "@/app/components/button";
import { getPropertiesByProjectId } from '@/clients/propertyClient';
import { getPropertyFloorByTowerId } from '@/clients/propertyFloorClient';
import { useQuery } from 'react-query';
import { useSession } from "next-auth/react"

export default ({ data, formData, handleChange, changeStep, configurations, projectTowers, selectedProperty }) => {
    const { data: { user, token } } = useSession();
    let { towerId, floorId, configId } = formData;

    const getFloors = async () => {
        const data = await getPropertyFloorByTowerId(towerId, token);       
        return data.map(item => ({ label: item.number, value: item.id, image:item.floorPlanImage }));
    }

    let { data: properties = [], isLoading } = useQuery({
        enabled: !!towerId && !!floorId,
        queryKey: ['getPropertiesByProjectId', towerId, floorId, configId],
        queryFn: () => getPropertiesByProjectId(data.id, token, { towerId, floorId, configId } = formData)
    });

    let { data: floors = [], isLoading: isFloorLoading } = useQuery({
        enabled: !!towerId,
        queryKey: ['getPropertyFloorByTowerId', towerId],
        queryFn: () => getFloors()
    });

    const units = properties.map(item => ({ label: item.unitId, value: item.id, disabled: item?.propertyStatus?.name == "SOLD" }))

    const handleNext = () => {
        changeStep(1);
    }

    const handleTowerChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const selectedFloor = React.useMemo(()=> floors.find(item => item.value == floorId )) || {};

    return (<div className="inventory-selection">
        <div className="d-xl-flex d-block site-plan-cnt g-0">
            <div className="property-card-cnt">
                <PropertyCard4 title={data.name}
                    hideLikeBtn={true}
                    verticalView={true}
                    bhk={data.configurations}
                    address={data.address}
                    priceRange={"₹40L-85L"}
                    imgsrc={data.logo || ""}
                    devImage={data.developerLogo}
                    by={data.developerName}
                    possessionInfo={data.possessionDue}
                    avgPrice={data.ratePerUnitInsqft || data.ratePerAreaUnit || "TO BE ANNOUNCED"}
                    id={data.id}
                    urlText={data.url}
                    subInfo={data.specification}
                    minPrice={data.minPrice}
                    maxPrice={data.maxPrice}
                />
            </div>
            <div className="site-plan position-relative">
                <Image className="site-plan-image ms-xl-5" src={"/sampleSitePlan.png"} fill={true} />
            </div>
        </div>
        <Heading label={"Select the Inventory"} />
        <div className="tower-bhk-cnt d-flex section align-items-center">
            <div className="tower-cnt d-flex align-items-center">
                <span className="sub-heading-space sub-heading-2">Tower</span>
                <DropDown className={"selection-dropdown"}
                    label={""}
                    handleChange={(event) => handleChange({ target: { name: "towerId", value: event.target.value } })}
                    value={formData.towerId}
                    values={projectTowers} />
            </div>
            <div className="bhk-cnt d-flex align-items-center">
                <span className="sub-heading-space sub-heading-2">Configuration</span>
                <DropDown className={"selection-dropdown"}
                    label={""} handleChange={(event) =>
                        handleChange({ target: { name: "configId", value: event.target.value } })}
                    value={formData.configId}
                    values={configurations} />
            </div>
        </div>
        {!!formData.towerId && <div className="floor-cnt section">
            <div className="d-flex floor-tabs">
                <span className="sub-heading-space sub-heading-2">Floor</span>
                <FormTabs variant={"contained"}
                    name="floorId"
                    height={30}
                    width={30}
                    items={floors}
                    selectedTab={formData.floorId}
                    onClick={handleChange} />
            </div>
            {!!formData.floorId && <Card className="floor-plan">
                <div>Floor Plan</div>
                <div className="floor-plan-img-cnt position-relative">
                    <Image src={selectedFloor.image} fill={true} />
                </div>
            </Card>}
        </div>}
        {!!towerId && !!floorId && <div className="apartment d-flex section align-items-xl-center">
            <span className="sub-heading-2">Unit</span>
            <FormTabs variant={"contained"} width={124} height={50} name="propertyId" items={units} selectedTab={formData.propertyId} onClick={handleChange} />
        </div>}
        {!!selectedProperty && <>
            <div className="take-tour d-flex align-items-center justify-content-center sub-heading-2">Take a Tour from the Selected Property</div>
            <Heading label={"Payment Summary"} />
            <PaymentSummary data={selectedProperty} />
            <div className='d-flex justify-content-end'>
                <Button className="next-button" rounded={true} height={48} text={"Next"} onClick={handleNext} />
            </div></>
        }
    </div>)
}