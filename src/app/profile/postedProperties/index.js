import SlantedTabs from "@/app/components/slantedTabs"
import Image from 'next/image'
import { useQuery } from 'react-query';
import "./styles.scss"
import SolrShareIcon from '@/app/icons/share.svg';
import DeleteIcon from '@/app/icons/delete.svg';
import EditIcon from '@/app/icons/edit.svg';
import { useSession } from "next-auth/react"
import { getPostedPropertiesByUserId } from '@/clients/propertyClient';
import dayjs from 'dayjs';
import CheckLeads from "../checkLeads";
import React from "react";

export default ({ }) => {
    const { data: { user, token } } = useSession();
    const initialState = { selectedId: "", modalEnabled: false};
    const [state, setState] = React.useState(initialState);
    const { data = [], isLoading, isError, error } = useQuery({
        queryKey: ['getPostedPropertiesByUserId' , user.id],
        queryFn: () => getPostedPropertiesByUserId(user.id, token),
    });

    const enableLeadModal = (id) => {
        setState(data =>  ({ data, ...{ selectedId:id, modalEnabled:true}}));
    }
    
    const disableModal = () => {
        setState(data =>  ({data, ...initialState}));
    }

    return (
        <div className='posted-properties'>
            <CheckLeads enabled={state.modalEnabled} id={state.selectedId} onClose={disableModal}/>
            <SlantedTabs className="tab-content">
                <div label="Currently Posted">
                    {data.map((item, index) => <div className={`posted-content ${index != 0 ? 'mt-3':''}`}>
                        <div className={`d-flex id-container justify-content-between align-items-center`}>
                            <div className="id sub-info">
                                ID: {item.id}
                            </div>
                            <div className="check-leads crimson-txt cursor-pointer" onClick={()=> enableLeadModal(item.id)}>
                                Check Leads                      
                            </div>
                        </div>
                        <div className='row property-info g-0'>
                            <div className='col-3 img-container position-relative'>
                                <Image src={item.logo||""} fill={true} />
                            </div>
                            <div className={`info-container d-flex flex-row col-9`}>
                                <div className='section-1 align-items-center justify-content-between'>
                                    <div className='title heading'>{item.name}</div>
                                    <div className='address'>{item.address}</div>
                                    <div className='construction-status'>{item.constructionStatus?.name}</div>
                                    <div className='bhk'>{item.configuration?.name}</div>
                                    <div className="area d-flex">
                                        <div className="sq-ft">{item.superArea} {item.areaUnits}</div>
                                        <div className="sq-ft-price">₹{item.ratePerUnitInsqft}/sq.ft</div>
                                    </div>
                                    <div className="posted-on">
                                        <div className="posted-txt">Posted on</div>
                                        <div className="posted-date">{dayjs(item.createdOn).format("DD-MM-YYYY")}</div>
                                    </div>
                                </div>
                                <div className='section-2'>
                                    <div className='avg-price'>
                                        <div className="price heading "><span className="heading-normal">₹</span> 3.78Cr</div>
                                        <div className="price-title sub-heading">Price</div>
                                    </div>
                                    <div className='rent-sale heading'>
                                       For {item.listingType?.name}
                                    </div>
                                </div>
                                <div className="section-3 d-flex flex-column align-items-end">
                                   <SolrShareIcon />
                                   <DeleteIcon />
                                   <EditIcon />
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
                <div label="Expired">
                    testing 2
                </div>
            </SlantedTabs>

        </div>)
}