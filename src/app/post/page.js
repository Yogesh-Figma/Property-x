import React from 'react'
import Image from 'next/image';
import './styles.scss'
import NextLinkButton from '@/app/components/nextLinkButton';
import Heading from '@/app/components/heading';
import Card from '@/app/components/card';
import YoutubePlayer from '@/app/components/youtubePlayer';
import { getAllPropertyCategory } from '@/clients/propertyClient';

export default async ({ }) => {
    const propertyTypes = await getAllPropertyCategory();
    return (<div className='post-property container-fluid'>
        <div className='container additional-page-padding'>
            <div className="property-txt d-flex flex-column align-items-center text-center">
                <div className="heading">Post a Property</div>
                <p className="maximize-your sub-heading-3">
                    Maximize your property&#39;s exposure by listing it with us.
                    <br />
                    Join our platform to effortlessly reach a wide audience of potential guests eager to book your space.
                </p>
            </div>
            <div className='d-flex mb-5 mb-xl-0'>
                <div className=''>
                    <Heading label={"I want to Post..."} />
                    <div className="property-btn d-sm-flex justify-content-between">
                        {propertyTypes.map(item => <><NextLinkButton className="mt-4 mt-sm-0" rounded={true} text={`${item.name} Property`} height={50} href={`/post/${item.name}`} />
                        </>)}
                    </div>
                </div>
                <div className='sticky-note-container position-relative d-none d-xl-inline-block'>
                    <Image className="header" alt="Header" fill={true} src="/stickyNote.svg" />
                </div>
            </div>
            <Heading label={"How it works?"} />
            <Card className="info-container">
                <div className='video-container d-lg-flex'>
                    <div className='video-1-container'><YoutubePlayer videoId={"hNAbQYU0wpg"} height={242} width={363}/></div>
                    <div className='video-2-container mt-4 mt-lg-0'><YoutubePlayer videoId={"hNAbQYU0wpg"} height={242} width={363} /></div>
                </div>
                <p className="info">
                    Lorem ipsum dolor sit amet consectetur. Sed nunc pellentesque arcu ultrices neque ornare et posuere
                    scelerisque. Eu cum lorem sed orci pulvinar elementum ullamcorper vitae. Nunc lacus vel amet diam pharetra
                    feugiat at tempus fames. Rhoncus arcu cursus ut elementum maecenas nam. Sit aliquet nunc maecenas nibh est
                    volutpat vestibulum. Ut molestie molestie id scelerisque gravida aliquam duis ornare. Molestie sed viverra
                    velit iaculis ullamcorper pharetra at penatibus. Viverra egestas pharetra vestibulum arcu cras vitae mi
                    eleifend senectus. Commodo eget tristique volutpat donec morbi netus. Lorem ipsum dolor sit amet
                    consectetur. Sed nunc pellentesque arcu ultrices neque ornare et posuere scelerisque. Eu cum lorem sed orci
                    pulvinar elementum ullamcorper vitae. Nunc lacus vel amet diam pharetra feugiat at tempus fames. Rhoncus
                    arcu cursus ut elementum maecenas nam. Sit aliquet nunc maecenas nibh est volutpat vestibulum. Ut molestie
                    molestie id scelerisque gravida aliquam duis ornare. Molestie sed viverra velit iaculis ullamcorper pharetra
                    at penatibus. Viverra egestas pharetra vestibulum arcu cras vitae mi eleifend senectus. Commodo eget
                    tristique volutpat donec morbi netus.Lorem ipsum dolor sit amet consectetur. Sed nunc pellentesque arcu
                    ultrices neque ornare et posuere scelerisque. Eu cum lorem sed orci pulvinar elementum ullamcorper vitae.
                    Nunc lacus vel amet diam pharetra feugiat at tempus fames. Rhoncus arcu cursus ut elementum maecenas nam.
                    Sit aliquet nunc
                </p>
            </Card>
        </div>
    </div>)
}