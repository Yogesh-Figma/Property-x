import React from 'react';
import CardSlider from '../../components/slider';
import { PropertyCard } from '../../components/ui/propertyCard'
import { getAllProperties } from '@/clients/propertyClient';
import './styles.scss'

const FeaturedProperties = async () => {
    const properties = await getAllProperties();
    return (<div className='featured-properties'>
        <CardSlider carouselSettings={{ slidesToShow: null, slidesToScroll: 1, variableWidth: true}}>
            {[1,2,3,4,5,6,7,8,9,10].map(i=>properties.map(item => {
                let address = "";
                if(!!item.propertyAddress){
                    let {propertyLocality ={}, propertyCity ={}} = item.propertyAddress;
                    address = propertyLocality.localityName + ", " + propertyCity.cityName
                }
                return (<PropertyCard 
                    id={item.propertyId}
                    postedBy={item.listingBy}
                    isProperty={true}
                    title={item.propertyName}
                    bhk={(item.propertyConfiguration || {}).propertyConfigurationName}
                    address={address}
                    price={item.propertyRatePerAreaUnit}
                    imgsrc={"/samplePropertyImage.jpeg"}
                    width={250}
                    height={"275px"}
                    devImage={"/devSampleImage.jpeg"} />)
            }))}
        </CardSlider>
    </div>)
}

export default FeaturedProperties;