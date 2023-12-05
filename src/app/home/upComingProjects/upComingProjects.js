import React from 'react';
import CardSlider from '../../components/slider';
import { PropertyCard2 } from '../../components/ui/propertyCard'
import { PROJECT_STATUS, getProjectsByStatus } from '@/clients/projectClient'
import './styles.scss';

const UpComingProjects = async () => {
    const projects = await getProjectsByStatus(PROJECT_STATUS.UPCOMING);
    console.log("Upcoming")
    console.log(projects);
    return (<div className='upcoming-projects overflow-container-fluid'>
        <CardSlider carouselSettings={{ slidesToShow: 3.5, slidesToScroll: 1, autoplay: true, nextArrow: null, prevArrow: null, autoplaySpeed: 2000, infinite: true }}>
            {projects.map(item => {
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
            )}
        </CardSlider>
    </div>)
}

export default UpComingProjects;