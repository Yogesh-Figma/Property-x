import React from 'react';
import './styles.scss'
import Filter from './filters';
import { PropertyCard4 } from '@/app/components/ui/propertyCard'
import Card from '@/app/components/card';
import ContactUsForm from '@/app/components/ui/contactUsForm';
import SimilarProjects from './similarProjects';
import SimilarProperties from './similarProperties';
import Image from 'next/image';
import horizontailGradientLine from '@/app/icons/horizontal_gradient_line.svg'

export default function Page() {
    return (<div className='search-page container-fluid'>
        <Filter />
        <div className='row additional-page-padding'>
            <div className='col-6 property-cards'>
                <PropertyCard4 title={"Gaur Krishn Villas"}
                    bhk={"2, 3, 4 BHK"}
                    address={"Sector 10, Greater Noida West, Greater Noida"}
                    priceRange={"₹40L-85L"}
                    imgsrc={"/samplePropertyImage.jpeg"}
                    devImage={"/devSampleImage.jpeg"}
                    by={"XYZ Builders"}
                    possessionInfo={"Dec, 2023"}
                    avgPrice={"14.00/sq.ft"}
                    subInfo={"Manorialle is a sound investment on all counts. You experience premium luxury when you live in it, and you yield premium returns when you don&rsquo;t. 40 levels of unique architecture create an imposing structure that blends seamlessly into the illustrious neighborhood. The stunning views from your Condominium on your independent floor will set your pulse racing, while the extraordinary service will soothe your senses, and two elevators, only at your service. This breathtaking community will be home to some of the most unseen marvels inspired by nature, with the utmost optimum utilization"}
                />
            </div>
            <div className='col-5'>
                <Card className="contact-us-card">
                    <div className='contact-support text-center sub-heading-2'>Contact Support</div>
                    <ContactUsForm />
                </Card>
            </div>
        </div>
        <div className='additional-page-padding'>
            <div className='similar'>
                <div className='sub-heading project-heading'>Similar Projects</div>
                <Image src={horizontailGradientLine} height={4} width={64}/>
                <SimilarProjects />
            </div>
            <div className='similar'>
                <div className='sub-heading project-heading'>Similar Properties</div>
                <Image src={horizontailGradientLine} height={4} width={64}/>
                <SimilarProperties />
            </div>
        </div>
    </div>)
}