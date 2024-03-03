import "./styles.scss"
import React from 'react'
import { PropertyCard4 } from '@/app/components/ui/propertyCard'
import { useQuery } from 'react-query';
import { getUserWishlist } from '@/clients/wishlistClient'
import { useSession } from "next-auth/react"
import NextLinkButton from "@/app/components/nextLinkButton";
import Image from 'next/image';

export default ({ wishlist }) => {
    const { data: { user, token } } = useSession();
    const { data: wishlists = [], isLoading, isError, error } = useQuery({
        queryKey: ['getUserWishlist'],
        queryFn: () => getUserWishlist(user.id, token),
    });
    return (
        <div className='wishlist'>
            <div className='property-cards'>
                {!isLoading && wishlists.length == 0 ? <div className="no-result d-flex align-items-center justify-content-center flex-column">
                    <Image src={"/wishListNoResult.png"} width={221} height={150} className="mb-3 mt-3" />
                    <div className="message mb-3 heading-4d">No Wishlist found!</div>
                    <NextLinkButton rounded={true} height={40} text={"Explore Properties"} href={"/"} />
                </div> :
                    (wishlists || []).map(wishlist => {
                        const data = wishlist.property || wishlist.project || {};
                        console.log("data", data)
                        return (
                            <div className='property-card-cont'>
                                <PropertyCard4
                                    isWished={true}
                                    title={data.name}
                                    bhk={data.configurations || (data.configuration || {}).propertyConfigurationName}
                                    address={data.address}
                                    furnishingInfo={data.furnishingStatus?.name}
                                    priceRange={"₹40L-85L"}
                                    imgsrc={data.logo || ""}
                                    devImage={data.developerLogo || ""}
                                    isProperty={!!wishlist.property}
                                    by={(data.developer || data.developerId)?.name}
                                    possessionInfo={data.possessionDue}
                                    avgPrice={data.ratePerUnitInsqft || "TO BE ANNOUNCED"}
                                    price={data.totalPrice}
                                    id={data.id}
                                    urlText={data.url}
                                    subInfo={data.propertySpecification || data.specification}
                                    minPrice={data.minPrice}
                                    maxPrice={data.maxPrice}
                                />
                            </div>)
                    })}
            </div>
        </div>)
}