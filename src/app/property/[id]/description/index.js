import Card from '@/app/components/card';
import Heading from '@/app/components/heading';
import "./styles.scss"

export default ({}) => {
    return (
        <>
            <Heading label={"Description"} />
            <Card className='property-description'>
                <p className="project-title sub-heading">Welcome to the world of T And T Digitown, where convenience and comfort converge.</p>
                <div className='project-location'>Siddharth Vihar, Ghaziabad</div>
                <div className='info-box-container'>
                    <div className='info-box d-inline-flex align-items-center justify-content-center flex-column'>
                        <div className='sub-heading-2'>1690 sq.ft</div>
                        <div className='sub-info'>Build Up Area</div>
                    </div>
                    <div className='info-box d-inline-flex align-items-center justify-content-center flex-column'>
                        <div className='sub-heading-2'>₹ 5.70 K/ sq. ft.</div>
                        <div className='sub-info'>Avg. Price</div>
                    </div>
                </div>
                <div className='property-description-txt'>
                    Discover Homes for Sale in Siddharth Vihar, Ghaziabad. Presenting T And T Digitown, an impeccably designed
                    project by T&amp;T Group. This development offers a range of Under Construction units, with a focus on
                    Apartments. If you&#39;re in search of a new home, T And T Digitown is a must-see. The available configurations
                    include spacious 3 BHK layouts, and the units are generously sized at 1690.0 sq.ft., as per the area plan.
                    Projected possession is set for August 2026, and the project is ideally situated in Siddharth Vihar.
                    <br />
                    The property boasts an array of amenities including Power Backup and Fire Sprinklers. Ensuring your safety and
                    peace of mind, there&#39;s round-the-clock security and the convenience of a Gated Community. These enriching
                    amenities elevate the allure of this property, making it an absolute aspiration.
                    <br />
                    T&amp;T Group stands tall as a reputable name in the real estate realm. Established in 2014, the company has
                    successfully delivered three noteworthy projects.
                    <br />
                    Siddharth Vihar enjoys a robust social infrastructure with banks, schools, and parks in close proximity. Plus,
                    the area is excellently connected to different parts of the city through a reliable public transport network.
                </div>
            </Card>
        </>
    )
}