import Image from 'next/image'
import React from 'react'
import TeenyIconsBuilding from '../../icons/teenyicons_building-outline.svg?url'
import RegularHandshake from '../../icons/fa-regular_handshake.svg?url'
import IconoirGroup from '../../icons/iconoir_group.svg?url'
import PixelArtBuilding from '../../icons/pixelarticons_buildings.svg?url'
import "./styles.scss"

const HomePageStats = () => {
    return (
        <div className='home-page-stats position-relative overflow-container-fluid align-items-center justify-content-center d-flex'>
            <Image src={"/propertyStatsImg.jpeg"} fill={true} />
            <div className='stats-container row g-0'>
                <div className='d-flex col-12 col-lg-6 ps-4 ps-lg-0 pb-4 pb-lg-0'>
                    <div className='stats row align-items-center justify-content-center text-lg-right text-sm-center'>
                        <div className='image-container d-flex align-items-center justify-content-center col-7 mb-1 mb-lg-0'>
                            <Image src={TeenyIconsBuilding} width={51} height={51} />
                        </div>
                        <div className='info col-lg-4 col-7 text-start'>
                            <div className='sub-info'>50 K+</div>
                            <div className=''>Property Options</div>
                        </div>
                    </div>

                    <div className='stats row align-items-center justify-content-center text-lg-right text-sm-center'>
                        <div className='image-container d-flex align-items-center justify-content-center col-7 mb-1 mb-lg-0'>
                            <Image src={RegularHandshake} width={62} height={51} />
                        </div>
                        <div className='info col-lg-4 col-7 text-start'>
                            <div className='sub-info'>50 +</div>
                            <div className=''>Partners</div>
                        </div>
                    </div>
                </div>
                <div className='d-flex col-12 col-lg-6 ps-4 ps-lg-0'>
                    <div className='stats row align-items-center justify-content-center text-lg-right text-sm-center'>
                        <div className='image-container d-flex align-items-center justify-content-center col-7 mb-1 mb-lg-0'>
                            <Image src={IconoirGroup} width={51} height={51} />
                        </div>
                        <div className='info col-lg-4 col-7 text-start'>
                            <div className='sub-info'>48 K+</div>
                            <div className=''>Customers</div>
                        </div>
                    </div>

                    <div className='stats row align-items-center justify-content-center text-lg-right text-sm-center'>
                        <div className='image-container d-flex align-items-center justify-content-center col-7 mb-1 mb-lg-0'>
                            <Image src={PixelArtBuilding} width={51} height={51} />
                        </div>
                        <div className='info col-lg-4 col-7 text-start'>
                            <div className='sub-info'>30 K+</div>
                            <div className=''>Listing Properties</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePageStats;