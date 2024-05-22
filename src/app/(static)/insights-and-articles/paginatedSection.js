'use client'
import { getAllBlogs } from '@/clients/blogClient';
import React from 'react'
import { useQuery } from 'react-query';
import InsightCard from './insightCard'
import Pagination from '@/app/components/pagination'
import BackdropLoader from '@/app/components/backdropLoader';

export default () => {
    const [page, setPage] = React.useState(0);

    let { isLoading,
        isError,
        error,
        data = {},
        isFetching,
        isPreviousData } = useQuery({
            queryKey: ['getAllBlogs', page],
            queryFn: () => getAllBlogs(false, 8, page),
            keepPreviousData: true
        });

    const handleChange = (event, value) => {
        setPage(value - 1);
    };

    return (<>
          <BackdropLoader open={isLoading} />
        <div className='blogs-list mt-4 row'>      
            {(data.content || []).map((item, index) => <InsightCard
                href={`/insights-and-articles/${item.url}`}
                className={"col-xl-3 col-md-4 col-6"}
                key={index}
                date={item.createdDate}
                heading={item.heading}
                subHeading={item.subHeading}
                image={item?.urls[0]?.imageUrl||""}
            />)}

        </div>
        {(data.content || []).length > 0 && <div className='pagination-container d-flex justify-content-end'>
            <Pagination count={data.totalPages} onChange={handleChange} page={page + 1} buttonHeight={20} fontSize={12} />
        </div>}
    </>)

}