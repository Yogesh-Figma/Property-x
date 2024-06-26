import Image from 'next/image';
import './styles.scss'
import VerticalHighlighter from '@/app/icons/vertical_highlighter.svg'
import NextLinkButton from '@/app/components/nextLinkButton';

const sections = [{
    heading: "E-Visits",
    txt: "We’re introducing 360-degree E-Visits to the properties that offer an opportunity to see the property, its neighborhood, and amenities, and gather as much information as you can."
}, 
{
    heading: "Personalized Recommendations",
    txt: "We’re transforming your home buying experience by matching home buyers with their dream homes through personalized recommendations tailored to each buyer's preferences and needs."
}, {
    heading: "Verified Listings",
    txt: "We’re assuring you peace of mind in your property search journey as all our property listings are 100% verified. We select exclusive properties keeping your requirements in mind."
}, {
    heading: "Data Security",
    txt: "We’re providing data security to our clients by putting security measures in place to ensure the security of communication between us and our customers during any real estate transaction."
}]

const AboutUs = async () => {
    return (<div className='about-us static-page'>
        <div className='info-container'>
            <div className='bg-container position-relative'>
                <Image alt="about us img" src={"/aboutUs.png"} className='position-absolute bg-img' fill={true} />
                <div className='info position-absolute'>
                    <div className='heading'>About Us</div>
                    <div className='sub-info'>A Platform for Digital Real Estate Management</div>
                </div>
            </div>
        </div>
        <div className='content-cnt container-fluid'>
            <div className='heading'>Welcome to Go Propify!</div>
            <p className='propify-info'>
            GOPROPIFY is simplifying the property booking experience with digital real estate management and
integrated online services for everything related to real estate. Make your property buying
experience seamless and enjoyable with us!
                <br />
                <br />
                We’re striving to redefine the way people search for and book properties by connecting property
seekers with their perfect property effortlessly. With our comprehensive suite of features, we make
online property search easier, quicker, and smarter!
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
                            Explore Go Propify - Revolutionizing the Real Estate Industry
                        </div>
                        <div className='txt mt-3'>Reshaping the real estate landscape by simplifying complexities while enhancing experiences for all involved.</div>
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