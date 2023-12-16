import React from 'react'
import Card from '@/app/components/card';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/app/components/button';
import starIcon from '@/app/icons/ic_baseline-star.svg?url'
import downloadIcon from '@/app/icons/download_file.svg?url'
import tickIcon from '@/app/icons/tick.svg?url'
import HeartIcon from '@/app/icons/heart.svg'
import ShareIcon from '@/app/icons/share.svg'
import './styles.scss'
import NextLinkButton from '@/app/components/nextLinkButton';
import propertyGraph from '@/app/icons/property_graph.svg?url'
import Rating from '@/app/components/rating'
import OverflowTip from '@/app/components/OverflowTip';

const ProjectCard = ({ title, bhk, address, price, imgsrc, width, height, rating = 4, isProperty, postedBy, id }) => {
    return (
        <div style={{ width: width }} key={id}>
            <Card className='project-card'>
                <div className='img-container position-relative'>
                    <Image src={imgsrc} fill={true} />
                    {!!isProperty && <div className='absolute-price position-absolute d-flex align-items-center justify-content-center'>{price}</div>}
                </div>
                <div className='info-container'>
                    <div className='row g-0'>
                        <div className='title sub-heading-2 col-8'><OverflowTip text={title} lines={1}/></div>
                        {!!rating && <div className='col-4'>
                            <div className='rating d-flex text-center align-items-center'>{rating}<span className='icon'>
                                <Image src={starIcon} width={10} height={10} /></span>
                            </div>
                        </div>}
                    </div>
                    <div className='row g-0'>
                        <div className='col-8'>
                            {!!address && <div className='address body-txt'>{address}</div>}
                            {!!bhk && <div className='bhk sub-heading-3'><OverflowTip text={bhk} lines={1}/></div>}
                            <div className='price-container d-flex align-items-center'>
                                <span className='price sub-heading-2'>{price}</span>
                                <Image src={propertyGraph} width={20} height={20} />
                                <span className='property-appreciation'>04.30%</span>
                            </div>
                        </div>
                        <div className='btn-cnt d-flex flex-column col-4 align-self-end align-items-end'>
                            <Button className="e-visit" text='e-Visit' height={20} rounded={true} variant='outlined' />
                            <NextLinkButton className="property-card-btn" text='View More' height={20} rounded={true} href={`/buy/${(isProperty? "property/":"project/") + id}`} />
                        </div>
                    </div>

                </div>
            </Card>
        </div>)

}

const PropertyCard = ({ title, bhk, address, price, imgsrc, width, height, rating = 4, isProperty, postedBy, id }) => {
    return (
        <div style={{ width: width }}>
            <Card className='property-card'>
                <div className='img-container position-relative'>
                    <Image src={imgsrc} fill={true} />
                    {!!isProperty && <div className='absolute-price position-absolute d-flex align-items-center justify-content-center'>{price}</div>}
                </div>
                <div className='info-container'>
                    <div className='row g-0'>
                        <div className='title sub-heading-2 col-8'><OverflowTip text={title} lines={1}/></div>
                        {!!rating && <div className='col-4'>
                            <div className='rating d-flex text-center align-items-center'>{rating}<span className='icon'>
                                <Image src={starIcon} width={10} height={10} /></span>
                            </div>
                        </div>}
                    </div>
                    <div className='row g-0'>
                        {!!bhk && <div className='bhk sub-heading-3'><OverflowTip text={bhk} lines={1}/></div>}
                        {!!address && <div className='address body-txt'>{address}</div>}

                        <div className='price-container d-flex justify-content-between align-items-start'>
                            <div className='posted-by'>Posted by {postedBy}</div>
                            <div className='btn-cnt'>
                                <NextLinkButton className="property-card-btn" text='View More' height={20} rounded={true} href={`/buy/${(isProperty? "property/":"project/") + id}`} />
                            </div>
                        </div>
                    </div>

                </div>
            </Card>
        </div>)

}


const PropertyCard2 = ({ title, bhk, address, price, imgsrc, width, height, by, id }) => {
    return (<div style={{ width: width }} key={id}>
        <Card className='property-card-2'>
            <div className='img-container  position-relative'>
                <Image src={imgsrc} fill={true} />
            </div>
            <div className='row info-container justify-content-between'>
                <div className='col-7'>
                    <div className='title sub-heading-2'><OverflowTip text={title} lines={1}/></div>
                    <div className='info'>
                        {!!by && <div className='by'>{by}</div>}
                        {!!address && <div className='address body-txt'>{address}</div>}
                    </div>
                </div>
                <div className='price-container col-5 text-end'>
                    {!!bhk && <div className='bhk sub-heading-3'><OverflowTip text={bhk} lines={1}/></div>}
                    {!!price && <div className='price sub-heading-2'>{price}</div>}
                </div>
            </div>
        </Card>
    </div>)
}

const PropertyCard3 = ({ title, bhk, address, price, imgsrc, width, height, by, devImage, id,maxWidth, isProperty }) => {
    return (<div style={{ width: width, maxWidth:maxWidth }} key={id}>
        <Card className='property-card-3'>
            <div className='img-container position-relative'>
                <Image src={imgsrc} fill={true} />
            </div>
            <div className='row g-0 property-info'>
                <div className='info-container'>
                    <div className='developer-info d-flex justify-content-between align-items-start'>
                        <div className='d-flex'>
                            <div className='dev-img-container position-relative'>
                                <Image src={devImage} width={40} height={40} />
                            </div>
                            <div>
                                <div className='d-flex align-items-center'><span className='by sub-heading-2'>{by}</span><Image src={propertyGraph} width={20} height={20} className='appreciation-icon' />  <span className='property-appreciation'>04.30%</span></div>
                                <Link href="/project" className='sub-heading-2 view-project'>View Project</Link>
                            </div>
                        </div>
                        <div className='price-container text-end'>
                            {!!price && <div className='price sub-heading-2'>{price}</div>}
                            {!!bhk && <div className='bhk'><OverflowTip text={bhk} lines={1}/></div>}
                        </div>
                    </div>
                    <div className='address-cnt d-flex justify-content-between align-items-start'>
                        <div className='info'>
                            <div className='title sub-heading-2'><OverflowTip text={title} lines={1}/></div>
                            {!!address && <div className='address'>{address}</div>}
                        </div>
                        <div className='btn-cnt d-flex'>
                            <Button className="e-visit" text='e-Visit' height={40} rounded={true} variant='outlined' />
                            <NextLinkButton className="property-card-btn" text='View More' height={40} rounded={true} href={`/buy/${(isProperty? "property/":"project/") + id}`} />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        </div>)
}

// Search page property card
const PropertyCard4 = ({ title, isProperty, bhk, address, priceRange, imgsrc, subInfo, avgPrice, possessionInfo, by, devImage, height, id, verticalView, visitDate, visitTime, isVisitCard, showRating, href = "/" }) => {
    return (<div style={{ height }} key={id}>
        <Card className='property-card-4 overflow-hidden row position-relative g-0'>
            <div className='row g-0 property-info'>
                <div className='img-container position-relative col-4'>
                    <Image src={imgsrc} fill={true} />
                </div>
                <div className={`info-container d-flex flex-column ${verticalView ? 'col-12' : 'col-8'}`}>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='title heading'><OverflowTip text={title} lines={1}/></div>
                        <div className='rera'>RERA<Image src={tickIcon} width={12} height={12} /></div>
                        {showRating ? <div className='rating-cnt'>
                            <div className='rate'>Rate now</div>
                            <Rating />
                        </div> :
                            <div className='share-container'>
                                {!verticalView && <HeartIcon width={22} height={20} />}
                                <ShareIcon width={24} height={24} />
                            </div>}
                    </div>
                    {!!by && <div className='by'>By {by}</div>}
                    {!!bhk && <div className='bhk'><OverflowTip text={bhk} lines={1}/></div>}
                    {!!address && <div className='address'>{address}</div>}
                    <div className='row g-0'>
                        <div className={`sub-container ${!!visitDate ? 'col-8' : ''}`}>
                            <div className='d-flex align-items-center price-details'>
                                <div className='possession-info'>
                                    <div>{possessionInfo}</div>
                                    <div>Possession Starts</div>
                                </div>
                                <div className='vertical-border'></div>
                                <div className='avg-price'>
                                    <div>₹{avgPrice}</div>
                                    <div>Avg Price</div>
                                </div>
                                <div className='vertical-border'></div>
                                {!!priceRange && <div className='price text-end'>
                                    <div className='heading'>{priceRange}</div>
                                    <div>Price Range</div>
                                </div>}
                            </div>
                            <div className='sub-info'>{subInfo}</div>
                        </div>
                        {!!visitDate && !!visitTime && <div className='schedule-date-cnt col-4 d-flex flex-column'>
                            <div className='date-cnt d-flex align-items-center justify-content-center'>{visitDate}</div>
                            <div className='time-cnt d-flex align-items-center justify-content-center'>{visitTime}</div>
                        </div>}
                    </div>
                    {/* <NextLinkButton aClassName="ml-auto" className="schedule-visit btn-gradient" text='Schedule a Visit' height={25} rounded={true} href="/" /> */}
                    <div className='d-flex dev-book-cnt align-items-center'>
                        <Image src={devImage} width={66} height={33} className='dev-image' />
                        <div className='by'>
                            <div className='sub-heading-2'>{by}</div>
                            <div className='dev-text sub-heading-3'>Developer</div>
                        </div>
                        {!verticalView && <div className='booking-btn-container ml-auto'>
                            <NextLinkButton className="property-card-btn" text='View' height={25} rounded={true} href={`/buy/${(isProperty? "property/":"project/") + id}`} />
                            {isVisitCard && <NextLinkButton variant="outlined-noborder" className="overview-btn" text='Talk to Consultant' height={25} rounded={true} href="/" />}
                        </div>}
                    </div>
                </div>
            </div>
            {!isVisitCard && <Link text='' href={"?id=" + id} className='stretched-link' />}
        </Card>
    </div>)
}


export { ProjectCard, PropertyCard, PropertyCard2, PropertyCard3, PropertyCard4 };