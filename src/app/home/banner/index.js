import CardSlider from "@/app/components/slider";
import bannerImage from '@/app/staticImages/homePageBanner.svg?url'
import Image from 'next/image'

const Banner = () => {
    return (
        <CardSlider hideArrow={true}
            carouselSettings={{ slidesToShow: 1, slidesToScroll: 1, variableWidth: false, centerMode: false }}>
            <div className="d-flex justify-content-end ">
                <Image alt="banner-image" style={{ }} className='banner-image' src={bannerImage} />
            </div>
            <div className="d-flex justify-content-end ">
                <Image alt="banner-image" style={{  }} className='banner-image' src={bannerImage} />
            </div>
            <div className="d-flex justify-content-end ">
                <Image alt="banner-image" style={{  }} className='banner-image' src={bannerImage} />
            </div>
        </CardSlider>
    )
}

export default Banner;