import React from 'react';
import Image from 'next/image';

import { getNearbyProject } from '@/clients/projectClient';
import { getNearbyProperty } from '@/clients/propertyClient';
import Link from 'next/link';


const Nearby =  async ({id, type }) => {
    let isProperty = type?.toLowerCase() == "property";
    let data = [];
    try {
        data = await (isProperty ?  getNearbyProperty(id): getNearbyProject(id));
    }
    catch(e){}
    return (data?.length > 0 ? <div className='similar-nearby ps-4 ps-lg-0 pt-lg-3 d-none d-md-block'>
        <div className='similar-project-txt'>Similar {type} Nearby</div>
        <div className='sub-info'>10km away from the searched location</div>
        <Link href={`/book/${isProperty ? "property/" : "project/"}${data[0].url}`}>
            <div className='nearby position-relative d-flex align-items-end justify-content-center'>
                <Image alt="nearby prop image" src={data[0].logo||""} className='nearby-prop-image' fill={true} />
                <div className='nearby-prop-info'>
                    <div className='title heading'>{data[0].name}</div>
                    <div className='address'>{data[0].address}</div>
                </div>
            </div>
        </Link>
    </div>:null)
}

export default Nearby;