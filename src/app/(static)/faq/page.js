import Image from 'next/image';
import '../styles.scss'
import dayjs from 'dayjs';
import { getTermsAndConditions } from '@/clients/staticContentClient'

const data = [
    {question: "What kinds of Properties can I find on the GoPropify Platform?", answer: "At Go Propify, we help you purchase and sell the property of any nature like: Residential - Flat, Studio Apartment, Villa, Bungalow, Land, etc. Commercial - Showroom, Office Space, Shop, Land, Building, etc. Industrial - Plot in SEZ, FTZ, EHTP, EOU, etc."},
    {question: "What is the difference between Carpet Area, Built-Up Area, and Super Built-Up Area?", answer: "A carpet area is the area where carpet can be laid i.e. the area which can be used. The built-up area includes the carpet area + the area of the balcony + area of the walls. Super built-up area includes built-up area + common spaces like lobby, lifts, etc."},
    {question: "Is there any benefit in Knowing the Carpet Area, Built-Up Area, and Super Built-Up Area?", answer: "The price of the property is fixed on a square feet basis. By knowing the breakup of the square feet the price of the property may vary considerably. Therefore, we would suggest you check whether the square feet break up is mentioned in the agreement or not."},
    {question: "How does GoPropify Secure its Client’s Data?", answer: "At GoPropify, we ensure that the client&#39;s information is kept fully confidential and the title search reports, documents, etc. are transmitted through secure web pages. We also don’t share our client’s data with any third party."},
    {question: "What is a Sale Deed?", answer: "With the help of a Sale Deed, also known as Conveyance Deed, the Seller transfers his rights and interest in the subject matter to the purchaser, who in turn acquires absolute ownership over the property."},
    {question: "Can a Sale Deed Serve as a Proof of Ownership?", answer: "No. A deed is just a document used to show the transfer of ownership and it is evidence to show that you have purchased whatever rights the seller had in the property. A deed does not show the liens and claims that may be outstanding against the property nor does it show the rights that others may have on the property."},
    {question: "What is a Title Search?", answer: "A “title search” is the process of checking out all the relevant records that confirm that the seller of a property is the legal owner of that particular property and that no liens are outstanding. A title search is an analysis of the status of the title of a property which includes the names of the title holders along with the property description and the details of how the property is held, etc."},
    {question: "Why Do I Need a Title Search?", answer: "A title search can be sought for a variety of purposes. Some users are interested in the purchase of the property for investment purposes. These users are desirous of knowing the history of the property as well as the present status of the property. Some users are real estate buyers, who are desirous of knowing the ownership of a property. Knowing the history, ownership, present status, liens, mortgages, etc. of the property helps the purchaser to negotiate the price of the property. It also helps the users to keep a check on their property by regularly updating themselves about the outstanding liens on their property, if any."},
    {question: "What are the benefits of performing a “Title Search”?", answer: "A title search can reveal the details about the title and ownership of the property as well and it can also show any title defects, liens, and other restrictions and encumbrances that might be attached to the property and might limit the use of the property."},
    {question: "How Can I Get More Detailed Information on a Property?", answer: "Click on “Contact Us” and get connected to us for further detailed information, we would be glad to help you in this regard."}
    ];

const FAQs = () => {
    return (<div className='terms-of-service static-page'>
        <div className='info-container position-relative'>
            <div className='info d-flex container-fluid'>
                <div className=''>
                    <div className='heading'>FAQs</div>
                    <div className='sub-heading'>Explore our FAQs to navigate through the seamless world of property booking on Go Propify..</div>
                </div>
                <Image alt="faqs" src={"/faqs.png"} className='d-none d-md-block ml-auto' width={250} height={250} />
            </div>
        </div>
        <div className='content-cnt container-fluid'>
            <div className='content'>
                <div className='last-updated sub-info body-txt'>Last updated on : 26-06-2024</div>
                <div className='welcome-text'>Explore our FAQs to navigate through the seamless world of property booking on Go Propify.</div>
                <div className='faq-container'>
                    {data.map(item => <div className='faq-item'>
                        <div className='heading mt-4'>Q. {item.question}</div>
                        <div className='sub-heading-2 mt-2'><span className='heading'>A. </span>{item.answer}</div>
                    </div>)}
                </div>
            </div>
        </div>
    </div>)
}


export default FAQs;