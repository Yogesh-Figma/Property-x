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
                {[1,2,3,4,5,6].map(i=>projects.map(item => {
                    let address = "";
                    if (!!item.projectAddress) {
                        let { locality = {}, city = {} } = item.projectAddress;
                        address = locality.localityName + ", " + city.cityName
                    }
                    return (<PropertyCard3
                        title={item.projectName}
                        bhk={item.projectConfiguration}
                        address={address ?? "Dummy Address"}
                        price={item.projectOtherChargesPerAreaUnit}
                        imgsrc={"/samplePropertyImage.jpeg"}
                        maxWidth={null}
                        width={null}
                        height={"275px"}
                        devImage={"/devSampleImage.jpeg"}
                        by={item.projectListedBy}
                        id={item.projectId}
                    />)
                }))}

            </CardSlider>
        </div>)
}

export default TrendingProjects;