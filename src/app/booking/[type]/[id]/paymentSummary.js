import Card from "@/app/components/card";
import Image from "next/image";
import { AMENITIES } from "@/app/buy/[type]/[id]/amenities";
import './paymentStyles.scss'
import { Divider } from '@mui/material';

export default ({ variant = "horizontal", data ={} }) => {
    return (
        <Card className={`payment-summary ${variant}`}>
            <div className="row g-0">
                <div className={variant == "vertical" ? 'col-xl-12 col-md-6 col-12':`col-md-6 col-12`}>
                    <div className="row g-0">
                        <div className="col-6 position-relative">
                            <Image src={"/mahunDeveloperImg.png"} fill={true} />
                        </div>
                        <div className="col-6 property-details">
                            <div className="title heading">{data.name}</div>
                            <div className="sub-info">{data.address}</div>
                            <div className="sub-info row"><span className="info col-6">Unit Area</span><span className="detail col-6">1000 sq ft</span></div>
                            <div className="sub-info row"><span className="info col-6">Tower No.</span><span className="detail col-6">{data.totalTowers}</span></div>
                            <div className="sub-info row"><span className="info col-6">Floor No.</span><span className="detail col-6">{data.totalUnits}</span></div>
                            <div className="sub-info row"><span className="info col-6">Configuration</span><span className="detail col-6">{data.configurations}</span></div>
                            <div className="sub-info row"><span className="info col-6">Apartment No.</span><span className="detail col-6">102</span></div>
                        </div>
                    </div>
                    <div className="amenities-container">
                        <div className="amenty-title">Amenities</div>
                        <div className="amenities d-flex flex-wrap">
                            {AMENITIES.map((item, index) => <div className='amenity text-center' key={index}>
                                <Image src={item.img} width={20} height={20} />
                                <div className='sub-info'>{item.name}</div>
                            </div>)}
                        </div>
                    </div>
                </div>
                {/* <div className="divider-cnt col-12 col-xl-1">
                    <Divider className="divider" />
                </div> */}
                <div className={(variant == "vertical" ? 'col-xl-12 col-md-6 col-12': "col-md-6 col-12") + " property-payable-container"}>
                    <div className="property-payable">
                        <div className="title row amount-payable heading"><div className="col-6">Total Payable Amount</div><div className="col-6">₹1,14,39,855</div></div>
                        <div className="title row cost-breakup heading"><div className="col-6">Cost Breakup (In ₹)</div></div>
                        <div className="row sub-info"><div className="col-6">Unit Area ( In sq ft)</div><div className="col-6">1,579</div></div>
                        <div className="row sub-info"><div className="col-6">Cost per unit area</div><div className="col-6">6,900</div></div>
                        <div className="row sub-info"><div className="col-6">Total Cost of Unit</div><div className="col-6">1,08,95,100</div></div>
                        <div className="row sub-info"><div className="col-6">Other Charges (Lease Rent) 95 per unit</div><div className="col-6">1,50,005</div></div>
                        <div className="row sub-info"><div className="col-6">Gross Cost of Unit</div><div className="col-6">1,15,26,700</div></div>
                        <div className="row sub-info"><div className="col-6">Discount</div><div className="col-6">6,31,600</div></div>
                        <div className="row sub-info"><div className="col-6">GST (5%)</div><div className="col-6">54,755</div></div>
                        <div className="row sub-info"><div className="col-6">Payable Amount</div><div className="col-6">1,14,39,855</div></div>
                        <div className="row title heading booking-amount"><div className="col-6">Booking Amount(10%)</div><div className="col-6">₹11,43,985.5</div></div>
                    </div>
                </div>
            </div>
        </Card>
    )
}