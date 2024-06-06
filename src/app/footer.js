import React from 'react';
import Image from 'next/image';
import './footer.scss'
import CompactSearchBar from './components/ui/compactSearchBar';
import Logo from '@/app/icons/logo.svg'
import facebookIcon from "@/app/icons/ri_facebook-fill.svg?url"
import twitterIcon from "@/app/icons/ri_twitter-x-fill.svg?url"
import linkedinIcon from "@/app/icons/ri_linkedin-fill.svg?url"
import instagramIcon from "@/app/icons/ant-design_instagram-filled.svg?url"
import YoutubeBW from "@/app/icons/youtube_bw.svg"
import Link from 'next/link'
import SeoLinks from '@/app/footerComponent/seoLinks'


const LINKS1 = [
    { name: "About Us", url: "/about-us" },
    { name: "Contact Us", url: "/contact-us" },
    { name: "Terms of Services", url: "/terms-of-service" },
    { name: "Privacy Policy", url: "/privacy-policy" },
    { name: "Refund Policy", url: "/refund-policy" },
    { name: "FAQs", url: "/faq" }  
]

const LINKS2 = [
    { name: "Developers in India", url: "/developers-in-india" },
    { name: "Projects in India", url: "/projects-in-india" },
    { name: "Insights and Articles", url: "/insights-and-articles" }
]

const ContactUsSection = () => {
    return (<>
        <div className='heading mb-4'>Connect with Us</div>
        <div className='connect-info'>Write to us at <div className='connect-info-sub'>test@test.com</div></div>
        <div className='connect-info'>Customer Care <div className='connect-info-sub'>customercare@example.com</div></div>
        <div className='connect-info'>Call us on <div className='connect-info-sub'>9876 543 2198</div></div>
    </>)
}

const ShareSection = () => {
    return (<>
        <div className='text-start keep-touch heading d-lg-block'>Keep in Touch </div>
        <div className="contact-icons-container d-lg-flex align-items-center">
            <div className="contact-image-wrapper d-inline-flex align-items-center justify-content-center">
                <Image className="img" width={30} height={30} alt="Ri facebook fill" src={facebookIcon} />
            </div>
            <div className="contact-image-wrapper d-inline-flex align-items-center justify-content-center">
                <Image className="img" width={30} height={30} alt="Ri twitter x fill" src={twitterIcon} />
            </div>
            <div className="contact-image-wrapper d-inline-flex align-items-center justify-content-center">
                <Image className="img" width={30} height={30} alt="Ri linkedin fill" src={linkedinIcon} />
            </div>
            <div className="contact-image-wrapper d-inline-flex align-items-center justify-content-center">
                <Image className="img" width={30} height={30} alt="Ant design instagram" src={instagramIcon} />
            </div>
            <div className="contact-image-wrapper d-inline-flex align-items-center justify-content-center">
                <YoutubeBW />
            </div>
        </div>
    </>)
}

const Footer = () => {
    return (
        <footer className={"text-center text-lg-start text-muted footer"}>
            <section className="">
                        <SeoLinks />
                        <div className='g-0 row container-fluid pt-5 site-links'>
                            <div className="col-4">
                                <Image alt="logo" className='mb-5' src={"/gopropifyColoredLogo.png"} width={268} height={60} />
                                <div className='d-none d-lg-block'>
                                    <ShareSection />
                                </div>
                            </div>
                            <div className='col-lg-3 d-lg-block d-none text-start connect-info-container'>
                                <ContactUsSection />
                            </div>
                            <div className='col-lg-5 col-12 row'>
                                <div className='col-6 text-start'>
                                    <div className='heading mb-4'>Company</div>
                                    {LINKS1.map((item, index) => <Link key={index} href={item.url} className="text-reset text-start d-block mb-4">{item.name}</Link>)}
                                </div>
                                <div className='col-6 text-start'>
                                    <div className='heading mb-4'>Discover</div>
                                    <Link href="/post-a-property" className='text-reset text-start d-block mb-4 position-relative list-property'>List a Property<Image src={"/freeicon.png"} width={38} height={36} className='position-absolute'/></Link>
                                    {LINKS2.map((item, index) => <Link key={index} href={item.url} className="text-reset text-start d-block mb-4">{item.name}</Link>)}
                                </div>
                            </div>
                            <div className='row text-start col-12 '>
                                <div className='col-6 connect-info-container d-lg-none d-block'>
                                    <ContactUsSection />
                                </div>
                                <div className='col-12 col-md-6 d-lg-none d-block mt-4 mt-md-0'>
                                    <ShareSection />
                                </div>
                            </div>
                            {/* <div className='col-4 download-app-container d-none d-lg-block'>
                                <div className='head text-start'>Download the App</div>
                                <div className='d-flex appLogo justify-content-end'>
                                    <Image width={144.6} height={51.64} style={{ maxWidth: "144.6px" }} src="/playStoreLogo.svg" className='col' />
                                    <Image width={144.6} height={51.64} style={{ maxWidth: "144.6px" }} src="/appleStoreLogo.svg" className='col' />
                                </div>
                                <div className='d-flex mt-4'>
                                    <div className='qr-code'><Image width={100} height={100} src="/qrCode.png" /></div>
                                    <div className='qr-code-msg text-center'>Scan the QR and download the App</div>
                                </div>
                            </div> */}
                        </div>
                        <div className='d-flex align-items-center justify-content-center p-5'>            
                            © Copyright 2024 GoPropify Pvt. Ltd. - All Rights Reserved.
                        </div>
            </section>
        </footer>)
}

export default Footer;