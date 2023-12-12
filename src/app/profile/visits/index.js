import "./styles.scss"
import React from 'react'
import { PropertyCard4 } from '@/app/components/ui/propertyCard'
import { useQuery } from 'react-query';
import { getUserVisits } from '@/clients/visitClient'
import { useSession } from "next-auth/react"
import SlantedTabs from "@/app/components/slantedTabs"


export default ({ }) => {
    const sampleDate = new Date();
    const { data: { user, token } } = useSession();
    console.log(token)
    const { data = {}, isLoading, isError, error } = useQuery({
        queryKey: ['getUserVisits'],
        queryFn: () => getUserVisits(user.id, token),
    });

    return (
        <div>
            <SlantedTabs className="tab-content">
                <div label="Upcoming Visits">
                    <div className='scheduled-visits'>
                        <div className='property-cards'>
                            {[1, 2, 3, 4, 5, 6].map(item => <div className='property-card-cont'>
                                <PropertyCard4 title={"Gaur Krishn Villas"}
                                    bhk={"2, 3, 4 BHK"}
                                    address={"Sector 10, Greater Noida West, Greater Noida"}
                                    priceRange={"₹40L-85L"}
                                    imgsrc={"/samplePropertyImage.jpeg"}
                                    devImage={"/devSampleImage.jpeg"}
                                    by={"XYZ Builders"}
                                    possessionInfo={"Dec, 2023"}
                                    avgPrice={"14.00/sq.ft"}
                                    id={item}
                                    showRating={true}
                                    isVisitCard={true}
                                    visitDate={sampleDate.toLocaleDateString()}
                                    visitTime={sampleDate.toLocaleTimeString()}
                                    subInfo={"Manorialle is a sound investment on all counts. You experience premium luxury when you live in it, and you yield premium returns when you don&rsquo;t. 40 levels of unique architecture create an imposing structure that blends seamlessly into the illustrious neighborhood. The stunning views from your Condominium on your independent floor will set your pulse racing, while the extraordinary service will soothe your senses, and two elevators, only at your service. This breathtaking community will be home to some of the most unseen marvels inspired by nature, with the utmost optimum utilization"}
                                />
                            </div>)}
                        </div>
                    </div>
                </div>
                <div label="Visited Projects/ Properties">
                    <div className='scheduled-visits'>
                        <div className='property-cards'>
                            {[1, 2, 3, 4, 5, 6].map(item => <div className='property-card-cont'>
                                <PropertyCard4 title={"Gaur Krishn Villas"}
                                    bhk={"2, 3, 4 BHK"}
                                    address={"Sector 10, Greater Noida West, Greater Noida"}
                                    priceRange={"₹40L-85L"}
                                    imgsrc={"/samplePropertyImage.jpeg"}
                                    devImage={"/devSampleImage.jpeg"}
                                    by={"XYZ Builders"}
                                    possessionInfo={"Dec, 2023"}
                                    avgPrice={"14.00/sq.ft"}
                                    id={item}
                                    showRating={true}
                                    isVisitCard={true}
                                    visitDate={sampleDate.toLocaleDateString()}
                                    visitTime={sampleDate.toLocaleTimeString()}
                                    subInfo={"Manorialle is a sound investment on all counts. You experience premium luxury when you live in it, and you yield premium returns when you don&rsquo;t. 40 levels of unique architecture create an imposing structure that blends seamlessly into the illustrious neighborhood. The stunning views from your Condominium on your independent floor will set your pulse racing, while the extraordinary service will soothe your senses, and two elevators, only at your service. This breathtaking community will be home to some of the most unseen marvels inspired by nature, with the utmost optimum utilization"}
                                />
                            </div>)}
                        </div>
                    </div>
                </div>
            </SlantedTabs>

        </div>)
}