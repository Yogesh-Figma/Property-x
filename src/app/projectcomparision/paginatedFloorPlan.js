"use client"
import React from 'react';
import Pagination from '@/app/components/pagination'
import Image from 'next/image';
import Heading from '@/app/components/heading';

export default function PaginatedFloorPlan({ floorPlans = [] }) {
    const [page, setPage] = React.useState(0);
    const handleChange = (event, value) => {
        setPage(value - 1);
    };

    return (
        <div className='paginated-floor-plan'>
            <div className='pagination-container d-flex justify-content-end'>
                <Pagination count={floorPlans.length} onChange={handleChange} page={page + 1} buttonHeight={20} fontSize={12} />
            </div>
            <div className='floor-plan-container'>
                <div className='apartment-bhk'>
                    <Heading label={floorPlans[page].bhk} />
                </div>
                <div className='floor-img-container'>
                    <Image src={floorPlans[page].imgUrl} width={198} height={165} />
                </div>
                <div className='price-container'>
                    <Heading label={`Price ${floorPlans[page].price}`} />
                </div>
            </div>
        </div>
    )
}