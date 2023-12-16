import React, { Suspense } from 'react';
import CardSlider from '../../components/slider';
import { PropertyCard3 } from '../../components/ui/propertyCard'
import { PROJECT_STATUS, getProjectsByStatus } from '@/clients/projectClient'
import './styles.scss';

const TrendingProjects = async () => {
    const projects = await getProjectsByStatus(PROJECT_STATUS.TRENDING);
    return (
        <div className='trending-projects'>
            <CardSlider carouselSettings={{
                slidesToShow: null, slidesToShow:3.1, centerMode:false, slidesToScroll: 1, variableWidth: false, infinite: true, responsive: [
                {
                    breakpoint: 1700,
                    settings: {
                        slidesToShow: 2.1,
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1.1,
                    }
                },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1.1,
                        }
                    }
                ]
                , autoplay: false, nextArrow: null, prevArrow: null, autoplaySpeed: 2000
            }}>
                {projects.map((item, index) => {
                    let address = "";
                    if (!!item.projectAddress) {
                        let { locality = {}, city = {} } = item.projectAddress;
                        address = locality.localityName + ", " + city.cityName
                    }
                    return (<PropertyCard3
                        key={index}
                        id={item.projectId}
                        title={item.projectName}
                        bhk={item.projectSpecification}
                        address={item.projectAddress}
                        price={item.projectRatePerAreaUnit}
                        imgsrc={"/samplePropertyImage.jpeg"}
                        maxWidth={null}
                        width={null}
                        height={"275px"}
                        devImage={"/devSampleImage.jpeg"}
                        by={item.projectDeveloperId?.developerLegalName}
                    />)
                })}

            </CardSlider>
        </div>)
}

export default TrendingProjects;