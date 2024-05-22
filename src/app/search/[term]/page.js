import SearchUI from './searchUI';
import UpcomingProjects from './upcomingProjects';
import { getGenericKeywordByPath } from '@/clients/seoClient'
import React, { Suspense } from 'react';
import { getAllCities } from '@/clients/cityClient'

const regex = /\/search\/([^?]+)(?:\?city=([^&]+))?(?:&category=([^&]+))?/;

export default async function Page({ params: { term },
    searchParams }) {
    let city, propertyCategory, onlyProject;
    city = searchParams?.city;
    onlyProject = searchParams?.onlyProject;
    propertyCategory = searchParams?.category;
    let userLocationInfo;
    if (Object.keys(searchParams).length == 0) {
        const genericTermData = await getGenericKeywordByPath(term);

        if (!!genericTermData && !!genericTermData.url) {
            [, term, city, propertyCategory] = genericTermData.url.match(regex);
            if(!!city){
                const cities = await getAllCities();
                const cityInfo = cities.find(item =>item.name.toLowerCase() == city.toLowerCase());
                userLocationInfo = {label:cityInfo.name,value:cityInfo.id, id:cityInfo.id};
            }

        }
       
    }

    return (<div className='search-page container-fluid'>
        <SearchUI userLocationInfo={userLocationInfo}
         term={term} cityName={city} 
         onlyProject={onlyProject} propertyCategory={propertyCategory} />
        <Suspense>
            <UpcomingProjects />
        </Suspense>
    </div>)
}