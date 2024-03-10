import React from 'react';
import CardSlider from '@/app/components/slider';
import { PropertyCard } from '@/app/components/ui/propertyCard';
import { getPropertiesByProjectId } from '@/clients/propertyClient';

const PropertiesInProject = async ({ id }) => {
    let data = []
    try {
         data = await getPropertiesByProjectId(id);
    }catch(e){}
    
    return (<div className='similar-properties'>
        <CardSlider carouselSettings={{ slidesToShow: null, slidesToScroll: 1, variableWidth: true }}>
            {data.map((item, index) => (<PropertyCard
                rating={item.ratingAverage}
                key={index}
                id={item.id}
                urlText={item.url}
                postedBy={item.developerName}
                isProperty={true}
                title={item.name}
                bhk={item.configuration?.name}
                address={item.address}
                avgPrice={item.ratePerUnitInsqft}
                price={item.totalPrice}
                imgsrc={item.logo || ""}
                width={270}
                height={"275px"}
                devImage={item.developerLogo} 
                minPrice={item.minPrice}
                maxPrice={item.maxPrice}
            />))}
        </CardSlider>
    </div>)
}

export default PropertiesInProject;