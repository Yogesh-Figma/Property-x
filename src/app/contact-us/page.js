import ContactUsForm from '../components/ui/contactUsForm';
import Image from 'next/image';
import './styles.scss'
import facebookIcon from "@/app/icons/ri_facebook-fill.svg?url"
import twitterIcon from "@/app/icons/ri_twitter-x-fill.svg?url"
import linkedinIcon from "@/app/icons/ri_linkedin-fill.svg?url"
import instagramIcon from "@/app/icons/ant-design_instagram-filled.svg?url"


const ContactUs = () => {
    return (<div className='contact-us-container container-fluid'>
        <div className='info text-center d-flex flex-column align-items-center'>
            <div className='heading'>Contact Us</div>
            <p className="connect-with-us text-center text-wrap">
                Have any Questions or Suggestions?
                <br />
                Reach out to us in any of the following ways. We would love to make your Property Booking
                Experience Seamless and Hassle-Free.
            </p>
        </div>
        <div className='contact-details row additional-page-padding'>
            <div className='col-12 col-md-7 contact-us-form-container'>
                <ContactUsForm />
            </div>
            <div className='col-1 d-none d-md-inline-block vertical-line'></div>
            <div className='col-md-4 col-12 address-container mt-5 mt-md-0 row'>
                <div className='col-sm-6 col-md-12'>
                    <div className="sub-heading-2">Office Address</div>
                    <p className="address">
                        11th Floor, Magnus Tower, Plot no 6, 
                        <br />
                        Sector 73, Noida,
                        <br />
                        Basi Bahuddin Nagar, Uttar Pradesh 201307,
                        <br />
                        India
                    </p>
                    <div className="write-to-us">
                        <div className="sub-heading-2">Write to us at</div>
                        <div>hello@gopropify.com</div>
                    </div>
                </div>
                <div className='col-sm-6 col-md-12'>
                    <div className="write-to-us">
                        <div className="sub-heading-2">Customer Care</div>
                        <div>care@gopropify.com</div>
                    </div>
                    <div className="write-to-us">
                        <div className="sub-heading-2">Call us on</div>
                        <div>9599960529</div>
                    </div>
                    <div className="sub-heading-2 write-to-us">Keep in Touch</div>
                    <div className="contact-icons-container">
                        <a href="https://www.facebook.com/GoPropify1/" className="contact-image-wrapper d-inline-flex align-items-center justify-content-center">
                            <Image className="img" width={20} height={20} alt="Ri facebook fill" src={facebookIcon} />
                        </a>
                        <a href="https://x.com/GoPropify" className="contact-image-wrapper d-inline-flex align-items-center justify-content-center">
                            <Image className="img" width={20} height={20} alt="Ri twitter x fill" src={twitterIcon} />
                        </a>
                        <a href="https://www.linkedin.com/company/97220277/admin/feed/posts/" className="contact-image-wrapper d-inline-flex align-items-center justify-content-center">
                            <Image className="img" width={20} height={20} alt="Ri linkedin fill" src={linkedinIcon} />
                        </a>
                        <a href="https://www.instagram.com/gopropify/"className="contact-image-wrapper d-inline-flex align-items-center justify-content-center">
                            <Image className="img" width={20} height={20} alt="Ant design instagram" src={instagramIcon} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}


export default ContactUs;