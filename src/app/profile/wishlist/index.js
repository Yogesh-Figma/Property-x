import "./styles.scss"
import React from 'react'
import { PropertyCard4 } from '@/app/components/ui/propertyCard'
import { useQuery } from 'react-query';
import { getUserWishlist } from '@/clients/wishlistClient'
import { useSession } from "next-auth/react"

export default ({ wishlist }) => {
    const { data: { user, token } } = useSession();
    const { data: wishlists = [], isLoading, isError, error } = useQuery({
        queryKey: ['getUserWishlist'],
        queryFn: () => getUserWishlist(user.id, token),
    });
    return (
        <div className='wishlist'>
            <div className='property-cards'>
                {(wishlists || []).map(wishlist => {
                    const data = wishlist.property || wishlist.project || {};
                    return (
                        <div className='property-card-cont'>
                            <PropertyCard4
                                title={data.name}
                                bhk={data.configurations || (data.configuration || {}).propertyConfigurationName}
                                address={data.address}
                                furnishingInfo={data.furnishingStatus?.name}
                                priceRange={"₹40L-85L"}
                                imgsrc={data.logo || ""}
                                devImage={"/devSampleImage.jpeg"}
                                isProperty={!!wishlist.property}
                                by={(data.developer || data.developerId)?.name}
                                possessionInfo={data.possessionDue}
                                avgPrice={data.ratePerUnitInsqft || "TO BE ANNOUNCED"}
                                id={data.id}
                                subInfo={data.propertySpecification || data.specification}
                            />
                        </div>)
                })}
            </div>
        </div>)
}