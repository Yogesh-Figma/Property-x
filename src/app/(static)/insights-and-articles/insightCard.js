import react from 'react';
import Image from 'next/image'
import dayjs from 'dayjs';
import Link from 'next/link'

const InsightCard = ({ heading, subHeading, date, image, className="", href="#" }) => {
    const createdOn = dayjs(date);
    return (
        <Link href={href} passHref className={`insight-card ${className}`}>
            <div className='img-cnt position-relative'>
                <Image src={image} fill={true}/>
            </div>
            <div className='insight-sub-info'>
                <span className='card-date'>{createdOn.format("MMMM DD, YYYY")}</span>
                <span></span>
            </div>
            <div className='heading text-truncate'>{heading}</div>
            <div className='info'>{subHeading}</div>
        </Link>
    )
}

export default InsightCard