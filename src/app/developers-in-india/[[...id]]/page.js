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
                India is home to the best builders and real estate developers who offer well-developed residential
                and commercial projects equipped with world-class facilities and amenities. The Real Estate
                Developers in India aim to develop projects that serve the best quality of life to the property buyers
                with ultra-modern amenities. The famous real estate developers in India are known for delivering a
                world-class lifestyle to clients. With the help of world-renowned architects and expert professionals,
                these developers offer a better property-buying experience in India. Real estate developers offer a
                variety of real estate properties across cities. In most cities in India, real estate developers offer
                residential launches to suit the budget of people with diverse income groups. The commercial
                properties developed by real-estate developers in India offer retail spaces, shops, open areas, food
                court areas, office spaces, and more. Choosing a real estate developer or builder for your next
                property purchase is a major decision. Here are the top real estate developers in India, Let’s explore
                and know more about them.
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