import React from 'react'
import Card from '@/app/components/card';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/app/components/button';
import starIcon from '@/app/icons/ic_baseline-star.svg'
import downloadIcon from '@/app/icons/download_file.svg'
import './styles.scss'
import NextLinkButton from '@/app/components/nextLinkButton';

const PropertyCard = ({ title, bhk, address, price, imgsrc, width, height, rating = 4 }) => {
    return (
        <div>
            <Card className='property-card'>
                <div className='img-container position-relative'>
                    <Image src={imgsrc} fill={true} />
                </div>
                <div className='info-container'>
                    <div className='row g-0'>
                        <div className='title sub-heading-2 col-8'>{title}</div>
                        {!!rating && <div className='col-4'><div className='rating d-flex text-center align-items-center'>{rating}<span className='icon'><Image src={starIcon} width={10} height={10} /></span></div></div>}
                    </div>
                    {!!bhk && <div className='bhk sub-heading-3'>{bhk}</div>}
                    {!!address && <div className='address body-txt'>{address}</div>}
                    {!!price && <div className='price-container d-flex justify-content-between align-items-center'>
                        <div className='price sub-heading-2'>{price}</div>
                        <Button text='Book Now' height={20} rounded={true} />
                    </div>
                    }
                </div>
            </Card>
        </div>)

}


const PropertyCard2 = ({ title, bhk, address, price, imgsrc, width, height, by }) => {
    return (<div>
        <Card className='property-card-2'>
            <div className='img-container  position-relative'>
                <Image src={imgsrc} fill={true} />
            </div>
            <div className='row info-container justify-content-between'>
                <div className='col-7'>
                    <div className='title sub-heading-2'>{title}</div>
                    <div className='info'>
                        {!!by && <div className='by'>{by}</div>}
                        {!!address && <div className='address body-txt'>{address}</div>}
                    </div>
                </div>
                <div className='price-container col-5 text-end'>
                    {!!bhk && <div className='bhk sub-heading-3'>{bhk}</div>}
                    {!!price && <div className='price sub-heading-2'>{price}</div>}
                </div>
            </div>
        </Card>
    </div>)
}

const PropertyCard3 = ({ title, bhk, address, price, imgsrc, width, height, by, devImage }) => {
    return (<div>
        <Card className='property-card-3 overflow-hidden row'>
            <div className='row g-0 property-info'>
                <div className='info-container col-4'>
                    <div className='developer-info'>
                        <div className='d-flex'>
                            <div className='dev-img-container position-relative'>
                                <Image src={devImage} width={40} height={40} />
                            </div>
                            <div>
                                {!!by && <div className='by sub-heading-2'>{by}</div>}
                                <Link href="/project" className='sub-heading-2'>View Project</Link>
                            </div>
                        </div>
                    </div>
                    <div className='info'>
                        <div className='title sub-heading-2'>{title}</div>
                        {!!address && <div className='address'>{address}</div>}
                    </div>
                    <div className='price-container col-5'>
                        {!!price && <div className='price sub-heading-2'>{price}</div>}
                        {!!bhk && <div className='bhk'>{bhk}</div>}
                    </div>
                    <Button text='Book Now' height={40} rounded={true} />
                </div>
                <div className='img-container position-relative col-8'>
                    <Image src={imgsrc} fill={true} />
                </div>
            </div>
        </Card>
    </div>)
}

// Search page property card
const PropertyCard4 = ({ title, bhk, address, priceRange, imgsrc, subInfo, avgPrice, possessionInfo, by, devImage, height=258 }) => {
    return (<div style={{height}}>
        <Card className='property-card-4 overflow-hidden row'>
            <div className='row g-0 property-info'>
                <div className='img-container position-relative col-4'>
                    <Image src={imgsrc} fill={true} />
                </div>
                <div className='info-container col-8 d-flex flex-column'>
                    <div className='title heading'>{title}</div>
                    {!!by && <div className='by'>By {by}</div>}
                    {!!bhk && <div className='bhk'>{bhk}</div>}
                    {!!address && <div className='address'>{address}</div>}
                    <div className='row'>
                        <div className='possession-info col-4'>
                            <div>{possessionInfo}</div>
                            <div>Possession Starts</div>
                        </div>
                        <div className='avg-price col-4'>
                            <div>{avgPrice}</div>
                            <div>Avg Price</div>
                        </div>
                        {!!priceRange && <div className='price col-4'>
                            <div>{priceRange}</div>
                            <div>Price Range</div>
                        </div>}
                    </div>
                    <div className='sub-info'>{subInfo}</div>
                    <NextLinkButton aClassName="ml-auto" className="schedule-visit" text='Schedule a Visit' height={25} rounded={true} href="/" />
                    <div className='d-flex dev-book-cnt align-items-center'>
                        <Image src={devImage} width={66} height={33} />
                        <div className='by'>
                            <div>{by}</div>
                            <div className='dev-text sub-heading-3'>Developer</div>
                        </div>
                        <div  className='booking-btn-container ml-auto'>
                            <NextLinkButton text='Brochure' height={25} rounded={true} variant="outlined" href="/" className="brochure-btn" endIcon={<Image src={downloadIcon} width={12} height={12.5}/>}/>
                            <NextLinkButton text='Book Now' height={25} rounded={true} href="/" />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </div>)
}


export { PropertyCard, PropertyCard2, PropertyCard3, PropertyCard4 };