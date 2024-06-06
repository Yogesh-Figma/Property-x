"use client"
import React from 'react';
import CardSlider from '@/app/components/slider';
import Image from 'next/image';
import "./styles.scss"
import Card from '@/app/components/card'
import { getProjectConfigurationById } from '@/clients/projectClient';
import { useQuery } from 'react-query';
import Helper from '@/common/helper';

const FloorPlan = ({ id, isProperty, floorPlan = {}, configuration = {}, propertyPrice }) => {
    const getProjectConfigurations = async () => {
        const data = await getProjectConfigurationById(id);
        let configurationMap = {};
        data.forEach(item => {
            let config = item.propertyConfiguration;
            config.price = item.configPrice;
            if (!configurationMap[config.name]) {
                configurationMap[config.name] = [];
            }
            configurationMap[config.name].push(config);
        });
        return configurationMap;
    }

    const { data: projectConfigurations = {} } = useQuery({
        enabled: id && !isProperty, queryKey: ['getProjectConfigurationById', id],
        queryFn: () => getProjectConfigurations()
    })

    let configurations = isProperty ? { [configuration?.name]: [{ price: propertyPrice, ...configuration }] } : projectConfigurations
    const configurationNames = Object.keys(configurations);

    const [selectedPlanIndex, selectFloorPlanIndex] = React.useState(0);
    const applicableConfigurations = !!configurations && !!configurationNames ? (configurations[configurationNames[selectedPlanIndex]] || []) : [];

    return (<div className='property-floor-plan'>
        <div className='floor-plains-available d-flex'>
            {configurationNames.map((plan, index) => {
                return (<div onClick={() => selectFloorPlanIndex(index)} className={`floor-option cursor-pointer d-flex align-items-center justify-content-center
                 ${selectedPlanIndex == index ? ' selected' : ''}`}>{plan}</div>)
            })}
        </div>
        {!isProperty && <div className='no-available'>{configurations.length} Plans available</div>}
        <div className='card-slider-floor'>
            <CardSlider hideArrow={isProperty} carouselSettings={{
                slidesToShow: Math.min(3, applicableConfigurations.length), // Adjust based on your requirement
                slidesToScroll: 1,
                centerMode: false,
                variableWidth: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: Math.min(1, applicableConfigurations.length),
                        },
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            slidesToShow: 1,
                        },
                    },
                ]
            }}>
                {applicableConfigurations.map((item, index) => <div key={index} className='floor-plan-card-container' style={{maxWidth:"80vw"}}>
                    <div className='p-1 pe-3'>
                        <Card className='d-flex'>
                            <div className='floor-info'>
                                <div className='size-info heading'>
                                    <div>{item.sizeInSqft} sq.ft.</div>
                                    <div>{Helper.currencyFormatter(item.price)}</div>
                                </div>
                                <ul>
                                    {(item.specifications || []).map(specification => <li>{specification.count} {specification.name}</li>)}
                                </ul>
                            </div>
                            <div className='image-container position-relative'>
                                <Image alt="floor plan image" src={item.floorPlanImage || ""} fill={true} />
                            </div>
                        </Card>
                    </div>
                </div>
                )}
            </CardSlider>
        </div>
    </div>)
}

export default FloorPlan;