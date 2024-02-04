
'use client'
import './styles.scss'
import React from 'react';
import { AMENITIES } from "@/app/buy/[type]/[urltext]/amenities";
import Image from 'next/image';
import NextLinkButton from '@/app/components/nextLinkButton';
import Rating from '@/app/components/rating';
import Button from '@/app/components/button';
import CrossIcon from '@/app/icons/cross_icon_filled.svg'
import AutoCompleteSearch from '@/app/components/autoCompleteSearch';
import PaginatedFloorPlan from './paginatedFloorPlan';
import { useAppContext } from '@/lib/appContext';
import ScheduleCalendar from '@/app/scheduleCalender';
import TalkToConsulantBtn from '@/app/actionBtns/talkToConsultantBtn';


const ProjectComparision = ({ }) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedProjects, selectProject] = React.useState([{ projectName: "Nirala Estate", priceRange: "", rating: "", id: "", location: "", status: "", configuration: "", size: "", area: "", possesionDate: "", reraNumber: "", floorPlanImg: "", amenities: [], convasImg: "" }]);
    const handleCross = () => {

    }

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const topProjects = [
        { label: 'Signature Global Signum 37D' },
        { label: 'Signature Global City 81' },
        { label: 'M3M Antalya Hills' },
        { label: 'Smart World Orchard' },
        { label: 'M3M Crown' },
        { label: "DLF The Arbour" },
    ];

    const floorPlans= [
        {imgUrl:"/floorPlanSample.jpeg", bhk:"2 BHK Apartment - 955 sq ft", price:"₹40L-85L"},
        {imgUrl:"/floorPlanSample.jpeg", bhk:"3 BHK Apartment - 955 sq ft", price:"₹85L-1Cr"},
        {imgUrl:"/floorPlanSample.jpeg", bhk:"4 BHK Apartment - 955 sq ft", price:"₹1.2Cr-4Cr"}
    ]

    return (<div class="container-fluid comparison-table-container mb-2">
        <ScheduleCalendar />
        <div class="comparison-table">
            <table class="table table-bordered">
                <thead class="table-header">
                    <tr>
                        <td class="comparision-header">
                            <div class="heading">
                                Comparative Analysis
                            </div>
                            <div className='informed-choices'>Making Informed Choices:<br /> Analyzing Property and Project Data </div>
                            <div>You can only compare Properties of the same type.</div>
                        </td>
                        <td className=''>
                            <div class="comparison-item d-flex flex-column align-items-center">
                                <span class="remove-item cursor-pointer"> <CrossIcon className="cross-icon" /></span>
                                <div className='prop-image'>
                                    <Image src={"/mahunDeveloperImg.png"} width={157} height={94} />
                                </div>
                                <div className='proj-title'>Nirala Estate</div>
                                <div class="proj-location sub-info">Techzone 4, Greater Noida West</div>
                                <div className="price-range-cnt">
                                    <div className="price sub-heading-2">₹83.17 L - 1.22 Cr</div>
                                </div>
                                <div className='rating d-flex align-items-center sub-info'>
                                    <span className='rating-value'>4.6</span>
                                    <Rating value={4.6} />
                                    <span className='rating-count'>(246 Ratings)</span>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <Button className="e-visit" text='e-Visit' height={34} rounded={true} variant='outlined' />
                            </div>
                        </td>
                        <td>
                            <div class="comparison-item d-flex flex-column align-items-center">
                                <span class="remove-item cursor-pointer"> <CrossIcon /></span>
                                <div className='prop-image'>
                                    <Image src={"/mahunDeveloperImg.png"} width={157} height={94} />
                                </div>
                                <div className='proj-title'>Nirala Estate</div>
                                <div class="proj-location sub-info">Techzone 4, Greater Noida West</div>
                                <div className="price-range-cnt">
                                    <div className="price sub-heading-2">₹83.17 L - 1.22 Cr</div>
                                </div>
                                <div className='rating d-flex align-items-center sub-info'>
                                    <span className='rating-value'>4.6</span>
                                    <Rating value={4.6} />
                                    <span className='rating-count'>(246 Ratings)</span>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <Button className="e-visit" text='e-Visit' height={34} rounded={true} variant='outlined' />
                            </div>
                        </td>
                        <td>
                            <div class="comparison-item d-flex flex-column align-items-center justify-content-center">
                                <div className='add-proj'>+ Add a Project</div>
                                <AutoCompleteSearch
                                    autoCompleteOptions={topProjects}
                                    rounded={true}
                                    width={"100%"}
                                    className='project-form-input'
                                    label={"Enter Project"}
                                    name="searchTerm"
                                    value={searchTerm}
                                    onChange={handleSearchTermChange}
                                    height={30}                               
                                />
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody id="" data-filter="target" className='proj-summary'>
                    <tr class="bg-secondary">
                        <th class="text-uppercase">Location</th>
                        <td><span class="location">Techzone 4, Greater Noida West</span></td>
                        <td><span class="">Sector 43, Noida</span></td>
                        <td><span class=""></span></td>
                    </tr>
                    <tr>
                        <th>Property Type</th>
                        <td>Apartments</td>
                        <td>Apartments</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>Ready to Move</td>
                        <td>Under Construction</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Price Range</th>
                        <td>60L - 1.82Cr</td>
                        <td>1.56 - 8.83Cr</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Unit Configuration</th>
                        <td>2, 3, 4 BHK</td>
                        <td>2, 3, 4, 5 BHK</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Unit Size</th>
                        <td>955 - 2320 sq ft</td>
                        <td>612.25 - 3754 sq ft</td>
                        <td></td>
                    </tr>
                    <tr class="bg-secondary">
                        <th class="">Project Area</th>
                        <td><span class="">11 Acres</span></td>
                        <td><span class="">11 Acres</span></td>
                        <td><span class=""></span></td>
                    </tr>
                    <tr>
                        <th>Possession Date</th>
                        <td>May 2025</td>
                        <td>May 2025</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>RERA Number</th>
                        <td>UPRERAPRJ617209</td>
                        <td>UPRERAPRJ704730</td>
                        <td></td>
                    </tr>
                    <tr className='floor-plan'>
                        <th>Floor Plan</th>
                        <td><PaginatedFloorPlan floorPlans={floorPlans}/></td>
                        <td><PaginatedFloorPlan floorPlans={floorPlans} /></td>
                        <td></td>
                    </tr>
                    <tr className='amenities'>
                        <th>Amenities</th>
                        <td> {AMENITIES.map((item, index) => <div className='amenity d-flex align-items-center' key={index}>
                            <Image src={item.img} width={20} height={20} />
                            <div className='sub-info'>{item.name}</div>
                        </div>)}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className='proj-canvas'>
                        <th>Project Canvas</th>
                        <td className='d-flex align-items-center flex-column'>
                            <Image src={"/projectCanvas.png"} width={245} height={175} />
                            <div className='d-flex align-items-center flex-column'>
                                <TalkToConsulantBtn height={40} />
                                <NextLinkButton variant="outlined-noborder" className="overview-btn" text='Schedule a Visit' height={40} rounded={true} href="?schedule=123" />
                            </div>
                        </td>
                        <td className=''>
                            <Image src={"/projectCanvas.png"} width={245} height={175} />
                            <div className='d-flex align-items-center flex-column'>
                                <TalkToConsulantBtn height={40} rounded={true} href="/" />
                                <NextLinkButton variant="outlined-noborder" className="overview-btn" text='Schedule a Visit' height={40} rounded={true} href="?schedule=123" />
                            </div>
                        </td>

                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>)
}


export default ProjectComparision