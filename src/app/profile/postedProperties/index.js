import SlantedTabs from "@/app/components/slantedTabs"
import Image from 'next/image'
import "./styles.scss"
import SolrShareIcon from '@/app/icons/share.svg';
import DeleteIcon from '@/app/icons/delete.svg';
import EditIcon from '@/app/icons/edit.svg';

export default ({ }) => {
    return (
        <div className='posted-properties'>
            <SlantedTabs className="tab-content">
                <div label="Currently Posted">
                    <div className="posted-content">
                        <div className="d-flex id-container justify-content-between align-items-center">
                            <div className="id sub-info">
                                ID: 1234567890
                            </div>
                            <div className="check-leads crimson-txt cursor-pointer">
                                Check leads
                            </div>
                        </div>
                        <div className='row property-info g-0'>
                            <div className='col-3 img-container position-relative'>
                                <Image src={"/samplePropertyImage.jpeg"} fill={true} />
                            </div>
                            <div className={`info-container d-flex flex-row col-9`}>
                                <div className='section-1 align-items-center justify-content-between'>
                                    <div className='title heading'>Independent Floor</div>
                                    <div className='address'>Wishtown, Sector - 128</div>
                                    <div className='construction-status'>Under Construction</div>
                                    <div className='bhk'>3 BHK</div>
                                    <div className="area d-flex">
                                        <div className="sq-ft">12345 sq. ft</div>
                                        <div className="sq-ft-price">₹14.00/sq.ft</div>
                                    </div>
                                    <div className="posted-on">
                                        <div className="posted-txt">Posted on</div>
                                        <div className="posted-date">20-08-2023</div>
                                    </div>
                                </div>
                                <div className='section-2'>
                                    <div className='avg-price'>
                                        <div className="price heading "><span className="heading-normal">₹</span> 3.78Cr</div>
                                        <div className="price-title sub-heading">Price</div>
                                    </div>
                                    <div className='rent-sale heading'>
                                       For Sale
                                    </div>
                                </div>
                                <div className="section-3 d-flex flex-column align-items-end">
                                   <SolrShareIcon />
                                   <DeleteIcon />
                                   <EditIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div label="Expired">
                    testing 2
                </div>
            </SlantedTabs>

        </div>)
}