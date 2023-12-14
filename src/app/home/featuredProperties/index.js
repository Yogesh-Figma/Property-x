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
            {[1,2,3,4,5,6,7,8,9,10].map(i=>properties.map(item => {
                let address = "";
                if(!!item.propertyAddress){
                    let {propertyLocality ={}, propertyCity ={}} = item.propertyAddress;
                    address = propertyLocality.localityName + ", " + propertyCity.cityName
                }
                return (<PropertyCard 
                    id={item.propertyId}
                    postedBy={item.propertyDeveloper?.developerLegalName}
                    isProperty={true}
                    title={item.propertyName}
                    bhk={item.propertyConfiguration?.propertyConfigurationName}
                    address={item.propertyAddress}
                    price={item.propertyRatePerUnitInsqft}
                    imgsrc={"/samplePropertyImage.jpeg"}
                    width={300}
                    height={"275px"}
                    devImage={"/devSampleImage.jpeg"} />)
            }))}
        </CardSlider>
    </div>)
}

export default FeaturedProperties;