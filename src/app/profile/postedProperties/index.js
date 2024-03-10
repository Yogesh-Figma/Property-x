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
import React from "react";
import Helper from "@/common/helper";
import { PostedPropertyCard } from '@/app/components/ui/propertyCard'
import NextLinkButton from "@/app/components/nextLinkButton";
import Link from 'next/link'

export default ({ }) => {
    const { data: { user, token } = {}  } = useSession();
    const { data = [], isLoading, isError, error } = useQuery({
        queryKey: ['getPostedPropertiesByUserId', user.id],
        queryFn: () => getPostedPropertiesByUserId(user.id, token),
    });

    return (
        <div className='posted-properties'>
            <SlantedTabs className="tab-content">
                <div label="Currently Posted">
                    {!isLoading && data.length == 0 ? <div className="no-result d-flex align-items-center justify-content-center flex-column">
                        <Image src={"/propertyNoResult.png"} width={221} height={150} className="mb-3 mt-3" />
                        <div className="message mb-3 heading-4d">Looks like you didn't book any property!</div>
                        <NextLinkButton rounded={true} height={40} text={"List a Property"} href={"/"} />
                    </div> : data.map((item, index) => <PostedPropertyCard
                        showChkLeadBtn={true}
                        className={index != 0 ? 'mt-3' : ''}
                        id={item.id}
                        logo={item.logo || ""}
                        name={item.name}
                        address={item.address}
                        constructionStatus={item.constructionStatus?.name}
                        configuration={item.configuration?.name}
                        price={item.totalPrice}
                        listingType={item.listingType?.name}
                        createdOn={item.createdOn}
                        superArea={item.superArea}
                        ratePerUnitInsqft={item.ratePerUnitInsqft}
                    />)}
                </div>
                <div label="Expired">
                    {<div className="no-result d-flex align-items-center justify-content-center flex-column">
                        <Image src={"/propertyNoResult.png"} width={221} height={150} className="mb-3 mt-3" />
                        <div className="message mb-3 heading-4d">No property expired!</div>
                        <NextLinkButton rounded={true} height={40} text={"List a Property"} href={"/"} />
                    </div>}
                </div>
            </SlantedTabs>
        </div>)
}