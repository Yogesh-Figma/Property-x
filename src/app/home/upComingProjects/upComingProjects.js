import React from 'react';
import CardSlider from '../../components/slider';
import { PropertyCard2 } from '../../components/ui/propertyCard'
import { PROJECT_STATUS, getProjectsByStatus } from '@/clients/projectClient'
import './styles.scss';

const UpComingProjects = async () => {
    const projects = await getProjectsByStatus(PROJECT_STATUS.UPCOMING);
    return (<div className='upcoming-projects overflow-container-fluid'>
        <CardSlider carouselSettings={{  slidesToShow: null, slidesToScroll:1, variableWidth:true, autoplay: true, nextArrow: null, prevArrow: null, autoplaySpeed: 2000, infinite: (projects.length > 1 ? true: false) }}>
            {projects.map((item, index) => {
                return (<PropertyCard2
                    key={index}
                    id={item.id}
                    title={item.name}
                    bhk={item.specification}
                    address={item.address}
                    price={item.ratePerAreaUnit}
                    imgsrc={item.logo || ""}
                    width={350}
                    height={"275px"}
                    devImage={"/devSampleImage.jpeg"} />)
            }
            )}
        </CardSlider>
    </div>)
}

export default UpComingProjects;