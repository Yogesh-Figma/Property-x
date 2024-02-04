import React from 'react';
import CardSlider from '@/app/components/slider';
import './styles.scss'
import { ProjectCard } from '@/app/components/ui/propertyCard'

const UpcomingLaunches = () => {
    return (<div className='upcoming-launches'>
        <div className='title heading'>Upcoming Launches nearby</div>
        <CardSlider carouselSettings={{ slidesToShow: null,  slidesToScroll: 1, variableWidth: true }}>
            {[1, 2, 3, 4, 5, 6].map((item, index) => <ProjectCard key={index} id={item} title={"Gaur Krishn Villas"} bhk={"2, 3, 4 BHK"} address={"Sector 10, Greater Noida West, Greater Noida"} price={"₹40L-85L"} imgsrc={"/samplePropertyImage.jpeg"} width={400} height={"275px"} devImage={"/devSampleImage.jpeg"} />)}
        </CardSlider>
    </div>)
}

export default UpcomingLaunches;