import React from 'react';
import CardSlider from '../../components/slider';
import { PropertyCard2 } from '../../components/ui/propertyCard'
import { PROJECT_STATUS, getProjectsByStatus } from '@/clients/projectClient'
import './styles.scss';

const UpComingProjects = async () => {
    const projects = await getProjectsByStatus(PROJECT_STATUS.UPCOMING);
    return (<div className='upcoming-projects overflow-container-fluid'>
        <CardSlider carouselSettings={{  slidesToShow: null, slidesToScroll:1, variableWidth:true, autoplay: true, nextArrow: null, prevArrow: null, autoplaySpeed: 2000, infinite: true }}>
            {[1,2,3,4,5,6].map(i=>projects.map(item => {
                let address = "";
                if (!!item.projectAddress) {
                    let { locality = {}, city = {} } = item.projectAddress;
                    address = locality.localityName + ", " + city.cityName
                }
                return (<PropertyCard2
                    id={item.projectId}
                    title={item.projectName}
                    bhk={item.projectConfiguration}
                    address={address}
                    price={item.projectRatePerAreaUnit}
                    imgsrc={"/samplePropertyImage.jpeg"}
                    width={250}
                    height={"275px"}
                    devImage={"/devSampleImage.jpeg"} />)
            }
            ))}
        </CardSlider>
    </div>)
}

export default UpComingProjects;