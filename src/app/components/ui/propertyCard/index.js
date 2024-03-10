import React from 'react'
import Card from '@/app/components/card';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/app/components/button';
import starIcon from '@/app/icons/ic_baseline-star.svg?url'
import downloadIcon from '@/app/icons/download_file.svg?url'
import tickIcon from '@/app/icons/tick.svg?url'
import WishListBtn from '@/app/actionBtns/wishListBtn';
import ShareIcon from '@/app/icons/share.svg'
import './styles.scss'
import NextLinkButton from '@/app/components/nextLinkButton';
import propertyGraph from '@/app/icons/property_graph.svg?url'
import Rating from '@/app/components/rating'
import SolrShareIcon from '@/app/icons/share.svg';
import DeleteIcon from '@/app/icons/delete.svg';
import EditIcon from '@/app/icons/edit.svg';
import OverflowTip from '@/app/components/OverflowTip';
import TalkToConsulantBtn from '@/app/actionBtns/talkToConsultantBtn';
import Helper from '@/common/helper';
import dayjs from 'dayjs';

const ProjectCard = ({ title, bhk, address, price, minPrice, maxPrice, imgsrc, width, height, rating, isProperty, postedBy, id, urlText }) => {
    return (
        <div style={{ width: width }} key={id}>
            <Card className='project-card'>
                <div className='img-container position-relative'>
                    <Image src={imgsrc||""} fill={true} />
                    {!!isProperty && <div className='absolute-price position-absolute d-flex align-items-center justify-content-center'>{isProperty? Helper.currencyFormatter(price): (Helper.currencyFormatter(minPrice) + "-" + Helper.currencyFormatter(maxPrice))}</div>}
                </div>
                <div className='info-container'>
                    <div className='row g-0'>
                        <div className='title sub-heading-2 col-8'><OverflowTip text={title} lines={1} /></div>
                        {!!rating && <div className='col d-flex'>
                            <div className='rating d-flex text-center align-items-center'>{rating||""}<span className='icon'>
                                <Image src={starIcon} width={10} height={10} /></span>
                            </div>
                        </div>}
                    </div>
                    <div className='row g-0'>
                        <div className='col-8'>
                            {!!address && <div className='address body-txt'>{address}</div>}
                            {!!bhk && <div className='bhk sub-heading-3'><OverflowTip text={bhk} lines={1} /></div>}
                            <div className='price-container d-flex align-items-center'>
                                <span className='price sub-heading-2'>{isProperty? Helper.currencyFormatter(price): (Helper.currencyFormatter(minPrice) + "-" + Helper.currencyFormatter(maxPrice))}</span>
                                {/* <Image src={propertyGraph} width={20} height={20} /> */}
                                {/* <span className='property-appreciation'>04.30%</span> */}
                            </div>
                        </div>
                        <div className='btn-cnt d-flex flex-column col-4 align-self-end align-items-end'>
                            <TalkToConsulantBtn height={20} rounded={true} className='property-card-btn' isProperty={isProperty} id={id} />
                            <NextLinkButton className="property-card-btn" text='View More' height={20} rounded={true} href={`/buy/${(isProperty ? "property/" : "project/") + urlText}`} />
                        </div>
                    </div>

                </div>
            </Card>
        </div>)

}

const PropertyCard = ({ title, bhk, address, price, minPrice, maxPrice, imgsrc, width, height, rating, isProperty, postedBy, id, urlText }) => {
    return (
        <div style={{ width: width }}>
            <Card className='property-card'>
                <div className='img-container position-relative'>
                    <Image src={imgsrc||""} fill={true} />
                    {!!isProperty && <div className='absolute-price position-absolute d-flex align-items-center justify-content-center'>{isProperty? Helper.currencyFormatter(price): (Helper.currencyFormatter(minPrice) + "-" + Helper.currencyFormatter(maxPrice))}</div>}
                </div>
                <div className='info-container'>
                    <div className='row g-0'>
                        <div className='title sub-heading-2 col-8'><OverflowTip text={title} lines={1} /></div>
                        {!!rating && <div className='col-4 d-flex'>
                            <div className='rating d-flex text-center align-items-center'>{rating||""}<span className='icon'>
                                <Image src={starIcon} width={10} height={10} /></span>
                            </div>
                        </div>}
                    </div>
                    <div className='row g-0'>
                        {!!bhk && <div className='bhk sub-heading-3'><OverflowTip text={bhk} lines={1} /></div>}
                        {!!address && <div className='address body-txt'>{address}</div>}

                        <div className='price-container d-flex justify-content-between align-items-start'>
                            <div className='posted-by'>Posted by {postedBy}</div>
                            <div className='btn-cnt'>
                                <NextLinkButton className="property-card-btn" text='View More' height={20} rounded={true} href={`/buy/${(isProperty ? "property/" : "project/") + urlText}`} />
                            </div>
                        </div>
                    </div>

                </div>
            </Card>
        </div>)

}


const PropertyCard2 = ({ title, bhk, address, price, minPrice, maxPrice, imgsrc, width, height, by, id, isProperty, urlText }) => {
    return (<div style={{ width: width }} key={id}>
        <Card className='property-card-2'>
            <div className='img-container  position-relative'>
                <Image src={imgsrc||""} fill={true} />
            </div>
            <div className='row info-container justify-content-between'>
                <div className='col-7'>
                    <div className='title sub-heading-2'><OverflowTip text={title} lines={1} /></div>
                    <div className='info'>
                        {!!by && <div className='by'>{by}</div>}
                        {!!address && <div className='address body-txt'>{address}</div>}
                        {!!bhk && <div className='bhk sub-heading-3'><OverflowTip text={bhk} lines={1} /></div>}
                    </div>
                </div>
                <div className='price-container col-5 text-end d-flex flex-column justify-content-between'>
                    {!!price && <div className='price sub-heading-2'>{isProperty? Helper.currencyFormatter(price): (Helper.currencyFormatter(minPrice) + "-" + Helper.currencyFormatter(maxPrice))}</div>}
                    <div className='btn-cnt'>
                        <NextLinkButton className="property-card-btn" text='View More' height={20} rounded={true} href={`/buy/${(isProperty ? "property/" : "project/") + urlText}`} />
                    </div>
                </div>
            </div>
        </Card>
    </div>)
}

const PropertyCard3 = ({ title, bhk, address, price, minPrice, maxPrice, imgsrc, width, height, by, devImage, id, maxWidth, isProperty, urlText }) => {
    return (<div style={{ width: width, maxWidth: maxWidth }} key={id}>
        <Card className='property-card-3'>
            <div className='img-container position-relative'>
                <Image src={imgsrc||""} fill={true} />
            </div>
            <div className='row g-0 property-info'>
                <div className='info-container'>
                    <div className='developer-info d-flex justify-content-between align-items-start'>
                        <div className='info'>
                            <div className='title sub-heading-2'><OverflowTip text={title} lines={1} /></div>
                            {!!address && <div className='address'>{address}</div>}
                        </div>

                        {/* <Image src={propertyGraph} width={20} height={20} className='appreciation-icon' />  
                                <span className='property-appreciation'>04.30%</span> */}
                        {/* <Link href="/project" className='sub-heading-2 view-project'>View Project</Link> */}
                        <div className='price-container text-end'>
                            <div className='price sub-heading-2'>{isProperty? Helper.currencyFormatter(price): (Helper.currencyFormatter(minPrice) + "-" + Helper.currencyFormatter(maxPrice))}</div>
                            {!!bhk && <div className='bhk'><OverflowTip text={bhk} lines={1} /></div>}
                        </div>
                    </div>

                    <div className='address-cnt d-flex justify-content-between align-items-start'>
                        <div className='dev-img-container position-relative d-flex'>
                            <Image src={devImage||""} width={40} height={40} />
                            <div className='ms-2 '>
                                <div className='by sub-info'>{by}</div>
                                <Link href={`/buy/${(isProperty ? "property/" : "project/") + urlText}`} className='view-project'>View {isProperty ?"Property":"Project"}</Link>
                            </div>
                        </div>
                        <div className='btn-cnt d-flex'>
                            <TalkToConsulantBtn height={40} rounded={true} className='me-2' isProperty={isProperty} id={id} />
                            <NextLinkButton className="property-card-btn" text='View More' height={40} rounded={true} href={`/buy/${(isProperty ? "property/" : "project/") + urlText}`} />
                        </div>
                    </div>
                </div>

            </div>
        </Card>
    </div>)
}

// Search page property card
const PropertyCard4 = ({ title, isProperty, showRating, ratingCnt, ratingValue,
    bhk, address, priceRange, imgsrc, subInfo,
    avgPrice, possessionInfo, by,
    devImage, height, id, verticalView,
    visitDate, visitTime, useStretchedLink,
    showTalkToConsultant, furnishingInfo,
    showRateNow, rera, hideLikeBtn, urlText, isWished,
    price, minPrice, maxPrice, }) => {
    return (<div style={{ height }} key={id}>
        <Card className={`property-card-4 overflow-hidden row position-relative g-0`}>
            {!!showRateNow && !!visitDate && !!visitTime && <div className='visit-rate-now-section p-2 d-flex justify-content-between align-items-center d-md-none'>
                <div className='schedule-date-cnt col-4 d-flex'>
                    <div className='date-cnt d-flex align-items-center justify-content-center'>{visitDate}</div>
                    <div className='time-cnt d-flex align-items-center justify-content-center'>{visitTime}</div>
                </div>
                <div className='rating-cnt'>
                    <div className='rate'>Rate now</div>
                    <Rating />
                </div>
            </div>}
            <div className='row g-0 property-info'>
                <div className='img-container position-relative col-4'>
                    <Image src={imgsrc||""} fill={true} />
                </div>
                <div className={`info-container d-flex flex-column ${verticalView ? 'col-12' : 'col-12 col-md-8'}`}>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='title heading'><OverflowTip text={title} lines={1} /></div>
                        {!!rera && <div className='rera'>RERA<Image src={tickIcon} width={12} height={12} /></div>}
                        {showRateNow ? <div className='rating-cnt d-none d-md-block'>
                            <div className='rate'>Rate now</div>
                            <Rating />
                        </div> :
                            <div className='share-container'>
                                {!hideLikeBtn && <WishListBtn id={id} isProperty={isProperty} width={22} height={20} isWished={isWished} />}
                                <ShareIcon width={24} height={24} />
                            </div>}
                    </div>
                    {!!by && <div className='by'>By {by}</div>}
                    {!!showRating && ratingCnt > 0 && <div className='rating d-flex align-items-center '>
                        <span className='rating-value'>{ratingValue}</span>
                        <Rating value={ratingValue} />
                        <span className='rating-count'>({ratingCnt} Ratings)</span>
                    </div>}
                    {!!bhk && <div className='bhk'><OverflowTip text={bhk} lines={1} /></div>}
                    {!!address && <div className='address'>{address}</div>}
                    <div className='row g-0'>
                        <div className={`sub-container ${!!visitDate ? 'visitdate col-12 col-md-8' : ''}`}>
                            <div className='d-flex align-items-center price-details'>
                                {isProperty ? <div className='possession-info'>
                                    <div>{furnishingInfo}</div>
                                    <div>Furnishing Type</div>
                                </div> : <div className='possession-info'>
                                    <div>{possessionInfo}</div>
                                    <div>Possession Starts</div>
                                </div>}
                                <div className='vertical-border'></div>
                                <div className='avg-price'>
                                    <div>{Helper.pricePerSqftFormatter(avgPrice)}</div>
                                    <div>Avg Price</div>
                                </div>
                                <div className='vertical-border'></div>
                                <div className='price text-end'>
                                    <div className='heading'>{isProperty? Helper.currencyFormatter(price): (Helper.currencyFormatter(minPrice) + "-" + Helper.currencyFormatter(maxPrice))}</div>
                                    <div>Price{!isProperty && " Range"}</div>
                                </div>
                            </div>
                            <div className='sub-info'>{subInfo}</div>
                        </div>
                        {!!visitDate && !!visitTime && <div className='schedule-date-cnt col-4 d-none d-md-flex flex-column align-items-end'>
                            <div className='date-cnt d-flex align-items-center justify-content-center'>{visitDate}</div>
                            <div className='time-cnt d-flex align-items-center justify-content-center'>{visitTime}</div>
                        </div>}
                    </div>
                    {/* <NextLinkButton aClassName="ml-auto" className="schedule-visit btn-gradient" text='Schedule a Visit' height={25} rounded={true} href="/" /> */}
                    <div className='d-flex dev-book-cnt align-items-center'>
                        <Image src={devImage||""} width={66} height={33} className='dev-image' />
                        <div className='by'>
                            <div className='sub-heading-2'>{by}</div>
                            <div className='dev-text sub-heading-3'>Developer</div>
                        </div>
                        <div className='booking-btn-container ml-auto'>
                            <NextLinkButton className="property-card-btn" text='View' height={25} rounded={true} href={`/buy/${(isProperty ? "property/" : "project/") + urlText}`} />
                            {showTalkToConsultant && <TalkToConsulantBtn height={25} rounded={true} isProperty={isProperty} id={id} />}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </div>)    
}


const PostedPropertyCard = ({ showChkLeadBtn, className, id, logo, name, address, constructionStatus, configuration, price, listingType, createdOn, superArea, ratePerUnitInsqft}) => {
    return (
        <div className={`posted-content ${className}`}>
        {showChkLeadBtn && <div className={`d-flex id-container justify-content-between align-items-center`}>
            <div className="id sub-info">
                ID: {id}
            </div>
            <Link href={`checkLeads/${id}`} className="check-leads crimson-txt cursor-pointer">
                Check Leads
            </Link>
        </div>}
        <div className='row property-info g-0'>
            <div className='col-3 img-container position-relative'>
                <Image src={logo || ""} fill={true} />
            </div>
            <div className={`info-container d-flex flex-row col-9`}>
                <div className='section-1 align-items-center justify-content-between'>
                    <div className='title heading'>{name}</div>
                    <div className='address'>{address}</div>
                    <div className='construction-status'>{constructionStatus}</div>
                    <div className='bhk'>{configuration}</div>
                    <div className="area d-flex">
                        <div className="sq-ft">{Helper.sqftSizeFormatter(superArea)}</div>
                        <div className="sq-ft-price">{Helper.pricePerSqftFormatter(ratePerUnitInsqft)}</div>
                    </div>
                    <div className="posted-on">
                        <div className="posted-txt">Posted on</div>
                        <div className="posted-date">{dayjs(createdOn).format("DD-MM-YYYY")}</div>
                    </div>
                </div>
                <div className='section-2'>
                    <div className='avg-price'>
                        <div className="price "><span className="heading-normal heading">{Helper.currencyFormatter(price)}<span className='per-month'>{((listingType||"").toLowerCase() == "rent" ? "/month":"")} </span></span></div>
                        <div className="price-title sub-heading">Price</div>
                    </div>
                    <div className='rent-sale heading'>
                        For {listingType}
                    </div>
                </div>
                <div className="section-3 d-flex flex-column align-items-end">
                    <SolrShareIcon />
                    <DeleteIcon />
                    <EditIcon />
                </div>
            </div>
        </div>
    </div>
    )}


export { ProjectCard, PropertyCard, PropertyCard2, PropertyCard3, PropertyCard4, PostedPropertyCard };