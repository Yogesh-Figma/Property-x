import Card from '@/app/components/card';
import Heading from '@/app/components/heading';
import Image from 'next/image'
import NextLinkButton from '@/app/components/nextLinkButton';
import "./styles.scss"

export const AMENITIES = [{ name: "Gated Community", img: "/amenities/gate.svg?url" },
{ name: "24/7 Power Backup", img: "/amenities/generator.svg?url" },
{ name: "Water Conservation", img: "/amenities/water.svg?url" },
{ name: "Open Parking", img: "/amenities/parking.svg?url" },
{ name: "CCTV", img: "/amenities/cctv.svg?url" },
{ name: "Store Water Drains", img: "/amenities/storm_water_drain.svg?url" },
{ name: "Solid Waste Management", img: "/amenities/solid_waste_management.svg?url" },
{ name: "Swimming Pool", img: "/amenities/swimming_pool.svg?url" },
{ name: "Multipurpose Hall", img: "/amenities/convention.svg?url" },
{ name: "Jogging Track", img: "/amenities/jogging.svg?url" },
{ name: "Meter Room", img: "/amenities/electric_meter.svg?url" },
{ name: "Fire Fighting System", img: "/amenities/sprinkler.svg?url" },
{ name: "Landscape Garden", img: "/amenities/forest.svg?url" },
{ name: "Gymnasium", img: "/amenities/gym.svg?url" },
{ name: "Children’s Play Area", img: "/amenities/playground.svg?url" }];


export default ({ imageWidth=45, imageHeight=45}) => {
    return (<div id="amenities">
        <Heading label={"Amenities"} />
        <Card className='property-amenities'>
            {AMENITIES.map((item, index) => <div className='amenity text-center' key={index}>
                <Image src={item.img} width={imageWidth} height={imageHeight} />
                <div className='sub-info'>{item.name}</div>
            </div>)}
        </Card>
    </div>)
}