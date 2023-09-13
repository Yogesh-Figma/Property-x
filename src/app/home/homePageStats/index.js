import Image from 'next/image'
import React from 'react'
import TeenyIconsBuilding from '../../icons/teenyicons_building-outline.svg'
import RegularHandshake from '../../icons/fa-regular_handshake.svg'
import IconoirGroup from '../../icons/iconoir_group.svg'
import PixelArtBuilding from '../../icons/pixelarticons_buildings.svg'
import "./styles.scss"

const HomePageStats = () => {
    return (
        <div className='home-page-stats position-relative overflow-container-fluid align-items-center justify-content-center d-flex'>
            <Image src={"/propertyStatsImg.jpeg"} fill={true} />
            <div className='stats-container d-flex'>
                <div className='stats row align-items-center justify-content-center text-lg-right text-sm-center'>
                    <div className='image-container d-flex align-items-center justify-content-center col-7 mb-1 mb-lg-0'>
                        <Image src={TeenyIconsBuilding} width={75} height={75} />
                    </div>
                    <div className='info col-lg-4 col-sm-7'>
                        <div className='sub-info'>50 K+</div>
                        <div className=''>Property Options</div>
                    </div>
                </div>
                <div className='stats row align-items-center justify-content-center text-lg-right text-sm-center'>
                    <div className='image-container d-flex align-items-center justify-content-center col-7 mb-1 mb-lg-0'>
                        <Image src={RegularHandshake} width={75} height={75} />
                    </div>
                    <div className='info col-lg-4 col-sm-7'>
                        <div className='sub-info'>50 +</div>
                        <div className=''>Partners</div>
                    </div>
                </div>
                <div className='stats row align-items-center justify-content-center text-lg-right text-sm-center'>
                    <div className='image-container d-flex align-items-center justify-content-center col-7 mb-1 mb-lg-0'>
                        <Image src={IconoirGroup} width={93.75} height={75} />
                    </div>
                    <div className='info col-lg-4 col-sm-7'>
                        <div className='sub-info'>48 K+</div>
                        <div className=''>Customers</div>
                    </div>
                </div>
                <div className='stats row align-items-center justify-content-center text-lg-right text-sm-center'>
                    <div className='image-container d-flex align-items-center justify-content-center col-7 mb-1 mb-lg-0'>
                        <Image src={PixelArtBuilding} width={75} height={75} />
                    </div>
                    <div className='info col-lg-4 col-sm-7'>
                        <div className='sub-info'>30 K+</div>
                        <div className=''>Listing Properties</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePageStats;