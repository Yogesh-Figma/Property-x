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
            if(!configurationMap[config.name]) {
                configurationMap[config.name] = [];
            }
            configurationMap[config.name].push(config);
        });
        return configurationMap;
    }

    const { data: projectConfigurations = {} } = useQuery({ enabled: id && !isProperty, queryKey: ['getProjectConfigurationById', id],     
    queryFn: () => getProjectConfigurations() })

    let configurations = isProperty ? {[configuration.name]: [{price:propertyPrice, ...configuration}]}: projectConfigurations
    const configurationNames = Object.keys(configurations);

    const [selectedPlanIndex, selectFloorPlanIndex] = React.useState(0);

    return (<div className='property-floor-plan'>
        <div className='floor-plains-available d-flex'>
            {configurationNames.map((plan, index) => {
                return (<div onClick={() => selectFloorPlanIndex(index)} className={`floor-option cursor-pointer d-flex align-items-center justify-content-center
                 ${selectedPlanIndex == index ? ' selected' : ''}`}>{plan}</div>)
            })}
        </div>
        {!isProperty && <div className='no-available'>{configurations.length} Plans available</div>}
        <CardSlider hideArrow={isProperty} carouselSettings={{ slidesToShow: null, slidesToShow: null, slidesToScroll: 1, variableWidth: true, centerMode: false }}>
            {!!configurations && !!configurationNames && !!configurations[configurationNames[selectedPlanIndex]] && (configurations[configurationNames[selectedPlanIndex]]||[]).map((item, index) => <div key={index} className='floor-plan-card-container' style={{ width: 704 }}>
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
                        <Image src={item.floorPlanImage||""} fill={true} />
                    </div>
                </Card>
            </div>
            )}
        </CardSlider>
    </div>)
}

export default FloorPlan;