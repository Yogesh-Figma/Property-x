"use client"
import React from 'react';
import Pagination from '@/app/components/pagination'
import Image from 'next/image';
import Heading from '@/app/components/heading';
import { getProjectConfigurationById } from '@/clients/projectClient';
import { useQuery } from 'react-query';
import Helper from '@/common/helper';

export default function PaginatedFloorPlan({ id, isProperty, floorPlan = {}, configuration = {}, propertyPrice, floorPlans = [] }) {
    const [page, setPage] = React.useState(0);
    const getProjectConfigurations = async () => {
        const data = await getProjectConfigurationById(id);
        let configurations = [];
        data.forEach(item => {
            let config = item.propertyConfiguration;
            config.price = item.configPrice;            
            configurations.push(config);
        });
        return configurations;
    }

    const { data: projectConfigurations = [] } = useQuery({ enabled: id && !isProperty, queryKey: ['getProjectConfigurationById', id],     
    queryFn: () => getProjectConfigurations() })

    let configurations = isProperty ? [{price:propertyPrice, ...configuration}]: projectConfigurations

    const handleChange = (event, value) => {
        setPage(value - 1);
    };

    return (
        <div className='paginated-floor-plan'>
            <div className='pagination-container d-flex justify-content-end'>
                <Pagination count={projectConfigurations.length} onChange={handleChange} page={page + 1} buttonHeight={20} fontSize={12} />
            </div>
            <div className='floor-plan-container'>
                <div className='apartment-bhk mb-2'>
                    <Heading label={configurations[page]?.name}/>
                </div>
                <div className='floor-img-container'>
                    <Image alt="floor plan" src={configurations[page]?.floorPlanImage ||""} width={198} height={165} />
                </div>
                <div className='price-container mt-2'>
                    <Heading label={`Price ${Helper.currencyFormatter(configurations[page]?.price)}`} />
                </div>
            </div>
        </div>
    )
}