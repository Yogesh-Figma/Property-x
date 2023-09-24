import Card from '@/app/components/card';
import Heading from '@/app/components/heading';
import Image from 'next/image'
import NextLinkButton from '@/app/components/nextLinkButton';
import "./styles.scss"

const AMENITIES = [{ name: "Gated Community", img: "/amenities/gate.svg" },
{ name: "24/7 Power Backup", img: "/amenities/generator.svg" },
{ name: "Water Conservation", img: "/amenities/water.svg" },
{ name: "Open Parking", img: "/amenities/parking.svg" },
{ name: "CCTV", img: "/amenities/cctv.svg" },
{ name: "Store Water Drains", img: "/amenities/storm_water_drain.svg" },
{ name: "Solid Waste Management", img: "/amenities/solid_waste_management.svg" },
{ name: "Swimming Pool", img: "/amenities/swimming_pool.svg" },
{ name: "Multipurpose Hall", img: "/amenities/convention.svg" },
{ name: "Jogging Track", img: "/amenities/jogging.svg" },
{ name: "Meter Room", img: "/amenities/electric_meter.svg" },
{ name: "Fire Fighting System", img: "/amenities/sprinkler.svg" },
{ name: "Landscape Garden", img: "/amenities/forest.svg" },
{ name: "Gymnasium", img: "/amenities/gym.svg" },
{ name: "Children’s Play Area", img: "/amenities/playground.svg" }];


export default () => {
    return (<>
        <Heading label={"Amenities"} />
        <Card className='property-amenities d-flex flex-wrap'>
            {AMENITIES.map((item, index) => <div className='amenity text-center' key={index}>
                <Image src={item.img} width={45} height={45} />
                <div className='sub-info'>{item.name}</div>
            </div>)}
        </Card>
    </>)
}