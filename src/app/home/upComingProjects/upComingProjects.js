import React from 'react';
import CardSlider from '../../components/slider';
import { PropertyCard2 } from '../../components/ui/propertyCard'
import { PROJECT_STATUS, getProjectsByStatus } from '@/clients/projectClient'
import './styles.scss';

const UpComingProjects = async () => {
    const projects = await getProjectsByStatus(PROJECT_STATUS.UPCOMING);
    console.log("UpComingProjects", projects);
    return (<div className='upcoming-projects overflow-container-fluid'>
        <CardSlider carouselSettings={{  slidesToShow: null, slidesToScroll:1, variableWidth:true, autoplay: true, nextArrow: null, prevArrow: null, autoplaySpeed: 2000, infinite: (projects.length > 1 ? true: false) }}>
            {projects.map((item, index) => {
                return (<PropertyCard2
                    key={index}
                    id={item.id}
                    urlText={item.url}
                    title={item.name}
                    bhk={item.specification}
                    address={item.address}
                    avgPrice={item.ratePerUnitInsqft}
                    price={item.totalPrice}
                    imgsrc={item.logo || ""}
                    width={350}
                    height={"275px"}
                    devImage={item.developerLogo} 
                    minPrice={item.minPrice}
                    maxPrice={item.maxPrice}/>)
            }
            )}
        </CardSlider>
    </div>)
}

export default UpComingProjects;