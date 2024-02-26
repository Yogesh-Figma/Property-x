import Card from "@/app/components/card";
import Image from "next/image";
import { AMENITIES } from "@/app/buy/[type]/[urltext]/amenities";
import './paymentStyles.scss'
import { Divider } from '@mui/material';
import Helper from "@/common/helper";

export default ({ variant = "horizontal", data ={} }) => {
    return (
        <Card className={`payment-summary ${variant}`}>
            <div className="row g-0">
                <div className={variant == "vertical" ? 'col-xl-12 col-md-6 col-12':`col-md-6 col-12`}>
                    <div className="row g-0">
                        <div className="col-6 position-relative">
                            <Image src={data.logo} fill={true} />
                        </div>
                        <div className="col-6 property-details">
                            <div className="title heading">{data.name}</div>
                            <div className="sub-info">{data.address}</div>
                            <div className="sub-info row"><span className="info col-6">Unit Area</span><span className="detail col-6">{Helper.sqftSizeFormatter(data.coveredArea)}</span></div>
                            <div className="sub-info row"><span className="info col-6">Tower No.</span><span className="detail col-6">{data.floor?.tower?.name}</span></div>
                            <div className="sub-info row"><span className="info col-6">Floor No.</span><span className="detail col-6">{data.floor?.number}</span></div>
                            <div className="sub-info row"><span className="info col-6">Configuration</span><span className="detail col-6">{data.configuration?.name || data.configurations}</span></div>
                            <div className="sub-info row"><span className="info col-6">Unit No.</span><span className="detail col-6">{data.unitId}</span></div>
                        </div>
                    </div>
                    <div className="amenities-container">
                        <div className="amenty-title">Amenities</div>
                        <div className="amenities d-flex flex-wrap">
                            {(data.amenities||[]).map((item, index) => <div className='amenity text-center' key={index}>
                                <Image src={item.amenityImage} width={20} height={20} />
                                <div className='sub-info'>{item.amenityName}</div>
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
                        <div className="row sub-info"><div className="col-6">Unit Area ( In sq ft)</div><div className="col-6">{Helper.sqftSizeFormatter(data.coveredArea)}</div></div>
                        <div className="row sub-info"><div className="col-6">Cost per unit area</div><div className="col-6">{Helper.pricePerSqftFormatter(data.ratePerUnitInsqft)}</div></div>
                        <div className="row sub-info"><div className="col-6">Total Cost of Unit</div><div className="col-6">{Helper.indianCurrencyFormatter(data.ratePerUnitInsqft * data.coveredArea)}</div></div>
                        <div className="row sub-info"><div className="col-6">Other Charges (Lease Rent) 95 per unit</div><div className="col-6">{Helper.pricePerSqftFormatter(data.otherChargesPerUnitSqft)}</div></div>
                        <div className="row sub-info"><div className="col-6">Gross Cost of Unit</div><div className="col-6">{Helper.indianCurrencyFormatter((data.otherChargesPerUnitSqft * data.coveredArea) + (data.ratePerUnitInsqft * data.coveredArea))}</div></div>
                        <div className="row sub-info"><div className="col-6">Discount</div><div className="col-6">{Helper.indianCurrencyFormatter(data.totalPrice * (data.discount/100))}</div></div>
                        <div className="row sub-info"><div className="col-6">GST (5%)</div><div className="col-6">{Helper.indianCurrencyFormatter(data.totalPrice * 0.05)}</div></div>
                        <div className="row sub-info"><div className="col-6">Payable Amount</div><div className="col-6">{Helper.indianCurrencyFormatter(data.totalPrice)}</div></div>
                        <div className="row title heading booking-amount"><div className="col-6">Booking Amount(10%)</div><div className="col-6">{Helper.indianCurrencyFormatter(data.totalPrice * 0.1)}</div></div>
                    </div>
                </div>
            </div>
        </Card>
    )
}