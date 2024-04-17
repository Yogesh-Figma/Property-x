import React from 'react';
import Image from 'next/image';
import './footer.scss'
import CompactSearchBar from './components/ui/compactSearchBar';
import Logo from '@/app/icons/logo.svg'
import facebookIcon from "@/app/icons/ri_facebook-fill.svg?url"
import twitterIcon from "@/app/icons/ri_twitter-x-fill.svg?url"
import linkedinIcon from "@/app/icons/ri_linkedin-fill.svg?url"
import instagramIcon from "@/app/icons/ant-design_instagram-filled.svg?url"
import Link from 'next/link'


const LINKS1 = [
    { name: "About Us", url: "/about-us" },
    { name: "List a property (Free)", url: "/post-a-property" },
    { name: "FAQs", url: "/faq" },
    { name: "Developers in India", url: "/developers-in-india" },
    { name: "Projects in India", url: "/projects-in-india" },
    { name: "Terms of Services", url: "/terms-of-service" },
    { name: "Refund Policy", url: "/refund-policy" },
    { name: "Contact Us", url: "/contact-us" }
]

const LINKS2 = [    
    { name: "Commercial Property in Greater Noida", url: "#" }, 
    { name: "Commercial Property in Noida", url: "#" },
    { name: "Commercial Property in Bengaluru", url: "#" },
    { name: "Commercial Property in Delhi", url: "#" },
    { name: "Commercial Property in Ghaziabad", url: "#" },
    { name: "Commercial Property in Gurgaon", url: "#" },
    { name: "Commercial Property in Mumbai", url: "#" },
    { name: "Commercial Property in Pune", url: "#" }]

const LINKS3 = [
    { name: "New Projects in Greater Noida", url: "#" }, 
    { name: "New Projects in Noida", url: "#" },
    { name: "New Projects in Bengaluru", url: "#" },
    { name: "New Projects in Delhi", url: "#" },
    { name: "New Projects in Ghaziabad", url: "#" },
    { name: "New Projects in Gurgaon", url: "#" },
    { name: "New Projects in Mumbai", url: "#" },
    { name: "New Projects in Pune", url: "#" }]

const Footer = () => {
    return (
        <footer className={"text-center text-lg-start text-muted footer container-fluid"}>
            <section className="">
                <div className="text-center text-md-starts pt-5">
                        <div className='col-xl-10'>
                            <div className='row footerLinksColumns g-0'>
                                <div className='col-lg-3'>
                                    {LINKS1.map(item => <Link href={item.url} className="text-reset text-start">{item.name}</Link>)}
                                </div>
                                <div className='col-lg-5'>
                                    {LINKS2.map(item => <Link href={item.url} className="text-reset text-start">{item.name}</Link>)}
                                </div>
                                <div className='col-lg-4'>
                                    {LINKS3.map(item => <Link href={item.url} className="text-reset text-start">{item.name}</Link>)}
                                </div>
                            </div>
                        </div>
                        <div className='hr'></div>
                        <div className='g-0 additional-page-padding d-lg-flex justify-content-between'>
                            <div className="col-3 mb-4 mb-lg-0">
                                <div className='property-x d-flex align-items-center justify-content-center'>
                                    <Image alt="logo" src={"/gopropifyColoredLogo.png"} width={138} height={30} />
                                </div>
                                <div className='trophy-container d-flex align-items-center justify-content-center'>
                                    <Image alt="trophy" src={"/trophy.svg"} width={70} height={70} />
                                </div>
                            </div>
                            <div className='col-lg-4 text-start about-us mb-4 mb-lg-0'>
                                <div className='head'>About Us</div>
                                <div className='text-justify'>We're your trusted partners in finding your dream home or making wise property investments. With a passion for delivering excellence, we've curated a diverse selection of properties that cater to every lifestyle and aspiration. Backed by a team of experienced professionals, we bring you personalized solutions that go beyond transactions – we're here to guide you through the entire journey. Welcome to a world of possibilities with Us.</div>
                            </div>
                            <div className='text-start connect-info-container'>
                                <div className='head'>Connect with Us</div>
                                <div className='connect-info'>Write to us at <div className='connect-info-sub'>test@test.com</div></div>
                                <div className='connect-info'>Customer Care <div className='connect-info-sub'>customercare@example.com</div></div>
                                <div className='connect-info'>Call us on <div className='connect-info-sub'>9876 543 2198</div></div>
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
                        <div className='social-media-links additional-page-padding'>
                            <div className='head text-start keep-touch'>Keep in Touch
                                <div className="contact-icons-container">
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
                                </div>
                            </div>
                            <div className='copy-right text-end mt-5'>Copyright 2023 Property X All Rights Reserved.</div>
                        </div>
                </div>
            </section>
        </footer>)
}

export default Footer;