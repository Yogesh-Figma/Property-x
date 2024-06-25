import Image from 'next/image'
import React, { Suspense } from 'react';
import Link from 'next/link'
import Header from './header'
import './page.scss'
import TrustedDevelopers from './home/trustedDeveloper'
import FeaturedProjects from './home/featuredProjects'
import TrendingProjects from './home/trendingProjects'
import bannerImage from './staticImages/homePageBanner.svg?url'
import HomePageStats from './home/homePageStats';
import SearchBar from './home/searchBar';
import InsightAndArticles from './home/insightAndArticles'
import Testimonials from './home/testimonials'
import FeaturedProperties from './home/featuredProperties'
import UpComingProjects from './home/upComingProjects/upComingProjects'
import Skeleton from '@mui/material/Skeleton';
import { getAllCities } from '@/clients/cityClient'
import Banner from './home/banner';

export default async function Home() {
  const cities = await getAllCities();
  const LOCATIONS = cities.map(item => { return ({label:item.name,value:item.id, id:item.id}) });
  return (
    <div className='home'>
      <div className='banner no-gutter container-fluid position-relative'>
        <div className='overflow-container-fluid'>
          <Banner />
        </div>
        <div className='banner-content position-absolute d-none d-lg-block'>
          <span className='content-1 heading'>Prime Property Deals at Your Fingertips <br /></span><span className='content-2 sub-heading'>The Ultimate Property Booking<br />Destination</span>
        </div>
      </div>
      <div className='search-bar-container d-flex align-items-center justify-content-center position-relative'>
        <SearchBar locations={LOCATIONS}/>
      </div>
      <div className='dev-card-listing container-fluid'>
          <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118}/>}>
            <TrendingProjects />
          </Suspense>
        <div className='developer-container'>
          <FeaturedProjects />
        </div>
        <div className='developer-container'>
          <FeaturedProperties />
        </div>
        <div className='developer-container'>
          <div className='sub-heading text-center title'>Launching Soon</div>
          <div className='sub-heading-3 text-center sub-title'>The Future of Living: A Glimpse into Our Upcoming Projects</div>
          <UpComingProjects />
        </div>
        <TrustedDevelopers />
        <HomePageStats />
        <Suspense>
            <InsightAndArticles />
        </Suspense>
        {/* <div className='developer-container'>
          <div className='sub-heading text-center title'>Testimonials</div>
          <div className='sub-heading-3 text-center sub-title'>Words from Our Delighted Customers</div>
          <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118}/>}>
            <Testimonials />
          </Suspense>
        </div> */}
        {/* <div className='download-app position-relative d-none d-lg-block'>
          <div className='download-app-txt-cnt'>
            <div className='download-app-txt heading'>Open door with a Tap</div>
            <div className='download-app-txt heading'>Download the App</div>
            <div className='download-app-sub-txt sub-heading'>Unlock the Seamless Booking Experience with us</div>
          </div>
          <div className='download-link-container d-flex align-items-center'>
            <Image src={"/appleStoreLogo.svg"} height={72} width={201} />
            <Image src={"/playStoreLogo.svg"} height={72} width={201} />
            <div className='scan-txt sub-heading-2'>Scan the QR and download the App</div>
            <Image src={"/qrCode.svg"} height={100} width={100} className='qr-code-img' />
          </div>
          <Image src={"/appImage.png"} height={400} width={464} className='download-logo position-absolute d-none d-xl-block' />
        </div> */}
      </div>
    </div>
  )
}
