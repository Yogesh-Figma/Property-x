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
            <p className="connect-with-us text-center">
                Connect with us today for hassle-free booking.
                <br />
                Our team is here to make your property booking experience seamless and enjoyable.
            </p>
        </div>
        <div className='contact-details row additional-page-padding'>
            <div className='col-7 contact-us-form-container'>
                <ContactUsForm />
            </div>
            <div className='col-1 vertical-line'></div>
            <div className='col-4 address-container'>
                <div className="sub-heading-2">Office Address</div>
                <p className="address">
                    Elegant Greens Residency
                    <br />
                    Sector 25, Greater Noida
                    <br />
                    Uttar Pradesh 201306
                    <br />
                    India
                </p>
                <div className="write-to-us">
                    <div className="sub-heading-2">Write to us at</div>
                    <div>example@example.com</div>
                </div>
                <div className="write-to-us">
                    <div className="sub-heading-2">Customer Care</div>
                    <div>customercare@example.com</div>
                </div>
                <div className="write-to-us">
                    <div className="sub-heading-2">Call us on</div>
                    <div>9876 543 2198</div>
                </div>
                <div className="sub-heading-2 write-to-us">Keep in Touch</div>
                <div className="contact-icons-container">
                    <div className="contact-image-wrapper d-inline-flex align-items-center justify-content-center">
                        <Image className="img" width={20} height={20} alt="Ri facebook fill" src={facebookIcon} />
                    </div>
                    <div className="contact-image-wrapper d-inline-flex align-items-center justify-content-center">
                        <Image className="img" width={20} height={20} alt="Ri twitter x fill" src={twitterIcon} />
                    </div>
                    <div className="contact-image-wrapper d-inline-flex align-items-center justify-content-center">
                        <Image className="img" width={20} height={20} alt="Ri linkedin fill" src={linkedinIcon} />
                    </div>
                    <div className="contact-image-wrapper d-inline-flex align-items-center justify-content-center">
                        <Image className="img" width={20} height={20} alt="Ant design instagram" src={instagramIcon} />
                    </div>
                </div>
            </div>
        </div>
    </div>)
}


export default ContactUs;