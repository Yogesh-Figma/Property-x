import React from 'react';
import Link from 'next/link'
import "./styles.scss"
import DeveloperDrawer from '@/app/developers-in-india/[[...id]]/allDeveloper';
import { getAllIndianDevelopers } from '@/clients/developerClient'

export default async function Page({ params: { id } }) {
    const data = await getAllIndianDevelopers();
    const selectedData = !!id ? (data || []).find(item => item.group == id).data || [] : [];
    return <div className='developer-in-india container-fluid'>
        <DeveloperDrawer id={id} data={selectedData} />
        <div className='additional-page-padding'>
            <div className='heading'>Developers in India</div>
            <div className='sub-info'>
                The Real Estate Companies in India are serving the people by offering solutions to all their property needs. With rising demand for residential and commercial space, the property developers are leaving no stone unturned and coming up with new projects in every real estate segment. The real estate and construction sectors are an integral part of Indian economy’s growth graph and responsible for the development of India’s core infrastructure. And the real estate developers, across cities, are offering a variety of inventories to buyers with different reasons. Most of the cities of India have residential launches in budget as well as luxury segments. The housing market of India has varied requirements from diverse income groups and the Property builders in India have successfully catered. The commercial properties delivered by builders include state-of-the-art offices, retail and institutional spaces. Winning the trust of millions of Indians, the real estate companies have more to offer.
                Let’s explore the best real estate companies in India and know more about them.
            </div>
            <div className='list'>
                <div className='heading dev-link-heading mt-3'>
                    List of Developers across India
                </div>
                <div className='dev-links d-flex flex-wrap'>
                    {data.map(item => <Link href={`/developers-in-india/${item.group}`} className='me-1'>{item.group}</Link>)}
                </div>
                <div className='developers'>
                    {data.map(item => {
                        return (
                            <div className='dev-data'>
                                <div className='heading'><Link href={`/developers-in-india/${item.group}`}>{item.group}</Link></div>
                                {(item.data || []).slice(0, 10).map(dev => 
                                    <Link href={`/developer/${dev.url}`} className='dev d-block'>{dev.name}</Link>)}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    </div>
}