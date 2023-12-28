import React from 'react'
import Rating from '@/app/components/rating'
import OverflowTip from '@/app/components/OverflowTip';
import dayjs from 'dayjs';
import ExpandIcon from '@/app/icons/expand_icon.svg';
import Card from '@/app/components/card'
import Image from 'next/image'
import Link from 'next/link'

let customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const DeveloperCard = ({ data }) => {

    const dateObj = dayjs(data.foundedOn, "DD/MM/YYYY");
    const date2 = dayjs();
    let years = date2.diff(dateObj, 'years');

    return (<Card className='dev-card position-relative'>
        <div className='d-flex flex-column justify-content-between h-100 dev-card-info'>
            <div className='sub-container w-100'>
                <div className='d-flex'>
                    <div className='image-container d-flex pe-2'>
                        <Image src="/strutiDeveloper.png" width={80} height={80} />
                    </div>
                    <div className='my-auto'>
                        <div className='sub-heading-2'>{data.name}</div>
                        <div className='rating d-flex align-items-center sub-info'>
                            {data.average > 0 && <><span className='rating-value'>{data.average}</span>
                                <Rating value={Number(data.average || 0)} /></>}
                        </div>
                    </div>
                    <Link href={`developer/${data.Id}`} className='expand-icon ms-auto'><ExpandIcon /></Link>
                </div>
                <div className='property-info'>
                    <span>{dateObj.format('YYYY')}<span className='body-txt'> Year Estd</span></span>
                    <span>{years}<span className='body-txt'> Years Experience</span></span>
                    <span>{data.totalProjects} <span className='body-txt'>Projects</span></span>
                </div>
                <div className='horizontal-line'></div>
                <div className='dev-description body-txt'><OverflowTip text={data.description} lines={8} /></div>
            </div>
        </div>
    </Card>)
}

export default DeveloperCard;