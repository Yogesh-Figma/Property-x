import React from 'react';
import CardSlider from '../../components/slider';
import { PropertyCard } from '../../components/ui/propertyCard'
import { getPropertyByStatus } from '@/clients/propertyClient';
import './styles.scss'
import { PROJECT_STATUS } from '@/clients/projectClient';

const FeaturedProperties = async () => {
    const properties = await getPropertyByStatus(PROJECT_STATUS.FEATURED);
    return (<div className='featured-properties'>
        <CardSlider carouselSettings={{ slidesToShow: null, slidesToScroll: 1, variableWidth: true}}>
            {properties.map((item, index) => {
                return (<PropertyCard 
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
                    width={300}
                    height={"275px"}
                    devImage={item.developerLogo} 
                    minPrice={item.minPrice}
                    maxPrice={item.maxPrice}
                    />)
            })}
        </CardSlider>
    </div>)
}

export default FeaturedProperties;