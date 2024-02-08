
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
import { useQuery } from 'react-query';
import ScheduleCalendar from '@/app/scheduleCalender';
import TalkToConsulantBtn from '@/app/actionBtns/talkToConsultantBtn';
import { getProjectComparisionData } from '@/clients/searchClient';


function fetchFromObject(obj, prop) {
    if(typeof obj === 'undefined') {
        return "";
    }
    var _index = prop.indexOf('.')
    if(_index > -1) {
        return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }

    return obj[prop];
}

const TableRow = ({ data = [], field, heading, defaultLen = 3, headingClassName, rowClassName }) => {
    let columns = [];
    for (let i = 0; i < defaultLen; i++) {
        columns.push(<td>{!!data[i] ? fetchFromObject(data[i], field) : ""}</td>)
    }
    return (
        <tr class={rowClassName}>
            <th class={headingClassName||""}>{heading}</th>
            {columns}
        </tr>
    )
}

const ProjectComparision = ({ }) => {
    const { comparisonProjects, removeProjectFromComparison, addProjectForComparison } = useAppContext();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedProjects, selectProject] = React.useState([{ projectName: "Nirala Estate", priceRange: "", rating: "", id: "", location: "", status: "", configuration: "", size: "", area: "", possesionDate: "", reraNumber: "", floorPlanImg: "", amenities: [], convasImg: "" }]);
    const handleCross = () => {

    }

    const populateComparisionData = async () => {
        if (!!comparisonProjects && comparisonProjects.length) {
            let data = await getProjectComparisionData(comparisonProjects.map(item => item.id));
            return data;
        }
    }

    const { data: projects = [], isLoading, isError, error } = useQuery({
        queryKey: ['getSearchData', comparisonProjects],
        queryFn: () => populateComparisionData(comparisonProjects),
    });


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

    const floorPlans = [
        { imgUrl: "/floorPlanSample.jpeg", bhk: "2 BHK Apartment - 955 sq ft", price: "₹40L-85L" },
        { imgUrl: "/floorPlanSample.jpeg", bhk: "3 BHK Apartment - 955 sq ft", price: "₹85L-1Cr" },
        { imgUrl: "/floorPlanSample.jpeg", bhk: "4 BHK Apartment - 955 sq ft", price: "₹1.2Cr-4Cr" }
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
                        {projects.map(item => <td className=''><div class="comparison-item d-flex flex-column align-items-center">
                            <span class="remove-item cursor-pointer" onClick={()=>removeProjectFromComparison(item.id)}> <CrossIcon className="cross-icon" /></span>
                            <div className='prop-image'>
                                <Image src={(item.images || [])[0] || ""} width={157} height={94} />
                            </div>
                            <div className='proj-title'>{item.name}</div>
                            <div class="proj-location sub-info">{item.address}</div>
                            <div className="price-range-cnt">
                                <div className="price sub-heading-2">₹83.17 L - 1.22 Cr</div>
                            </div>
                            {!!item.ratingCount && <div className='rating d-flex align-items-center sub-info'>
                                <span className='rating-value'>{item.ratingAverage}</span>
                                <Rating value={Number(item.ratingAverage)} />
                                <span className='rating-count'>({item.ratingCount} Ratings)</span>
                            </div>}
                        </div>
                            <div className='d-flex justify-content-center'>
                                <Button className="e-visit" text='e-Visit' height={34} rounded={true} variant='outlined' />
                            </div>  </td>)}
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
                <TableRow rowClassName="bg-secondary" heading={"Location"} headingClassName={"text-uppercase"} data={projects} field="address"/>                   
                <TableRow heading={"Property Type"} data={projects} field="projectType.propertyCategory.name"/>
                <TableRow heading={"Status"} data={projects} field="constructionStatus.name"/>
                <TableRow heading={"Price Range"} data={projects} field="ratePerAreaUnit"/>
                <TableRow heading={"Unit Configuration"} data={projects} field="configurations"/>
                <TableRow heading={"Unit Size"} data={projects} field="unit"/>
                <TableRow heading={"Project Area"} data={projects} field="area"/>
                <TableRow heading={"Possession Date"} data={projects} field="possessionDue"/>
                <TableRow heading={"RERA Number"} data={projects} field="rera"/>                 
                    <tr className='floor-plan'>
                        <th>Floor Plan</th>
                        <td><PaginatedFloorPlan floorPlans={floorPlans} /></td>
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