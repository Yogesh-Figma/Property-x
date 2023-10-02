import Image from 'next/image'
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

export default function Home() {
  return (
    <div className='home'>
      <div className='banner no-gutter container-fluid'>
        <div className='d-flex justify-content-end position-relative'>
          <Image className='banner-image overflow-container-fluid' src={bannerImage} />
        </div>
        <div className='banner-content position-absolute'><span className='content-1 heading'>Prime Property Deals at Your Fingertips <br /></span><span className='content-2 sub-heading'>The Ultimate Property Booking<br />Destination</span>
        </div>
      </div>
      <div className='search-bar-container d-flex align-items-center justify-content-center position-relative'>
        <SearchBar />
      </div>
      <div className='dev-card-listing container-fluid'>
        <div className='developer-container'>
          <div className='sub-heading text-center title'>Trending Projects</div>
          <div className='sub-heading-3 text-center sub-title'>A Close Look at Remarkable Listings</div>
          <TrendingProjects />
        </div>
        <div className='developer-container'>
          <div className='sub-heading text-center title'>Trusted Developers</div>
          <div className='sub-heading-3 text-center sub-title'>Our Top Developer Picks for You</div>
          <TrustedDevelopers />
        </div>
        <div className='developer-container additional-page-padding'>
          <div className='sub-heading text-center title'>Featured Projects</div>
          <div className='sub-heading-3 text-center sub-title'>Tailored Exclusively to Suit Your Preferences</div>
          <FeaturedProjects />
        </div>
        <div className='developer-container additional-page-padding'>
          <div className='sub-heading text-center title'>Featured Properties</div>
          <div className='sub-heading-3 text-center sub-title'>Individually Selected to Match Your Desires</div>
          <FeaturedProperties />
        </div>
        <div className='developer-container'>
          <div className='sub-heading text-center title'>Upcoming Projects</div>
          <div className='sub-heading-3 text-center sub-title'>The Future of Living: A Glimpse into Our Upcoming Projects</div>
          <UpComingProjects />
        </div>
        <HomePageStats />
        <div className='developer-container'>
          <div className='sub-heading text-center title'>Insights and Articles</div>
          <div className='sub-heading-3 text-center sub-title'>Stay Informed, Stay Ahead: Explore Our News and Articles</div>
          <InsightAndArticles />
        </div>
        <div className='developer-container'>
          <div className='sub-heading text-center title'>Testimonials</div>
          <div className='sub-heading-3 text-center sub-title'>Words from Our Delighted Customers</div>
          <Testimonials />
        </div>       
        <div className='download-app position-relative'>
          <div className='download-app-txt-cnt'>
            <div className='download-app-txt heading'>Open door with a Tap</div>
            <div className='download-app-txt heading'>Download the App</div>
            <div className='download-app-sub-txt sub-heading'>Unlock the Seamless Booking Experience with us</div>
          </div>
          <div className='download-link-container d-flex align-items-center'>
            <Image src={"/appleStoreLogo.svg"} height={72} width={201} />
            <Image src={"/playStoreLogo.svg"} height={72} width={201} />
            <div className='scan-txt sub-heading-2'>Scan the QR and download the App</div>
            <Image src={"/qrCode.svg"} height={100} width={100} className='qr-code-img'/>
          </div>
          <Image src={"/appImage.png"} height={400} width={464} className='download-logo position-absolute d-none d-xl-block'/>
        </div>
      </div>
    </div>
  )
}
