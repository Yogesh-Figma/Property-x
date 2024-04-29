import Image from 'next/image';
import './styles.scss'
import VerticalHighlighter from '@/app/icons/vertical_highlighter.svg'
import NextLinkButton from '@/app/components/nextLinkButton';

const sections = [{
    heading: "e-Visits",
    txt: "Lorem ipsum dolor sit amet consectetur. Morbi feugiat aliquam aenean mollis nunc feugiat. Purus neque nullam dictumst enim ut vivamus adipiscing dis."
}, {
    heading: "Personalized Recommendations",
    txt: "Lorem ipsum dolor sit amet consectetur. Morbi feugiat aliquam aenean mollis nunc feugiat. Purus neque nullam dictumst enim ut vivamus adipiscing dis."
}, {
    heading: "Verified Listings",
    txt: "Lorem ipsum dolor sit amet consectetur. Morbi feugiat aliquam aenean mollis nunc feugiat. Purus neque nullam dictumst enim ut vivamus adipiscing dis."
}, {
    heading: "Intuitive Search",
    txt: "Lorem ipsum dolor sit amet consectetur. Morbi feugiat aliquam aenean mollis nunc feugiat. Purus neque nullam dictumst enim ut vivamus adipiscing dis."
}]

const AboutUs = async () => {
    return (<div className='about-us static-page'>
        <div className='info-container'>
            <div className='bg-container position-relative'>
                <Image alt="about us img" src={"/aboutUs.png"} className='position-absolute bg-img' fill={true} />
                <div className='info position-absolute'>
                    <div className='heading'>About Us</div>
                    <div className='sub-info'>Empowering Your Property Journey with Go Propify</div>
                </div>
            </div>
        </div>
        <div className='content-cnt container-fluid'>
            <div className='heading'>Welcome to Go Propify!</div>
            <p className='propify-info'>
                At Go Propify, we're passionate about simplifying the property booking experience. Whether you're searching for your dream home, planning a vacation rental, or seeking an ideal commercial space, we're here to make the process seamless and enjoyable.
                <br />
                <br />
                Our mission is clear: to connect property seekers with their perfect spaces effortlessly. We believe that finding the right property shouldn't be stressful or time-consuming. Through our user-friendly platform and innovative features, we strive to redefine the way people search for and book properties.
            </p>
            <div className='row no-gutter set-apart-cnt'>
                <div className='img-cnt col-md-4 col-12 position-relative'>
                    <Image src={"/aboutUsImg1.png"} fill={true}/>
                </div>
                <div className='ps-md-5 col-md-8 col-12 pt-4 pt-md-0'>
                    <div className='heading'>
                        What Sets Us apart
                    </div>
                    <div className='section-cnt row g-0'>
                        {sections.map(item => <div className='section col-md-6 col-12 d-flex'>
                            <VerticalHighlighter />
                            <span className="section-info w-100">
                                <div className='heading-4d'>{item.heading}</div>
                                {item.txt}
                            </span>
                        </div>)}
                    </div>
                </div>
            </div>
            <div className='prop-images-cnt d-flex g-0'>
                <div className='left-cnt img-box-1'>
                    <div className='img-container position-relative'>
                        <Image src={"/aboutUsImg2.png"} fill={true}/>
                    </div>
                    <div className='sub-info-2'>
                        <div className='heading-4d mt-5'>
                            Unlocking Seamless Property Experiences:<br /> Explore Go Propify
                        </div>
                        <div className='txt mt-3'>Your Trusted Partner in Property Booking Innovation</div>
                        <NextLinkButton text='Explore' className="home-btn mt-3" rounded={true} height={48} width={157} href={`/`} />
                    </div>
                </div>
                <div className='d-flex g-0 img-box-2 flex-wrap'>
                    <div className='position-relative img-container'>
                        <Image src={"/aboutUsImg3.png"} width={221} height={221} />
                    </div>
                    <div className='position-relative img-container'>
                        <Image src={"/aboutUsImg4.png"} width={221} height={221}  />
                    </div>
                    <div className='position-relative img-container'>
                        <Image src={"/aboutUsImg5.png"} width={221} height={221}  />
                    </div>
                    <div className='position-relative img-container'>
                        <Image src={"/aboutUsImg6.png"} width={221} height={221}  />
                    </div>
                </div>
            </div>
        </div>
    </div>)
}


export default AboutUs;