import Card from '@/app/components/card';
import Heading from '@/app/components/heading';
import "./styles.scss"

export default ({data, type}) => {
    return (
        <div id="description">
            <Heading label={"Description"}/>
            <Card className='property-description'>
                <p className="project-title sub-heading">{data[type + "Name"]}</p>
                <div className='project-location'>{data[type + "Address"]}</div>
                <div className='info-box-container'>
                    <div className='info-box d-inline-flex align-items-center justify-content-center flex-column'>
                        <div className='sub-heading-2'>{data[type + "SuperArea"]}</div>
                        <div className='sub-info'>Build Up Area</div>
                    </div>
                    <div className='info-box d-inline-flex align-items-center justify-content-center flex-column'>
                        <div className='sub-heading-2'>{data[type + "RatePerUnitInsqft"]}</div>
                        <div className='sub-info'>Avg. Price</div>
                    </div>
                </div>
                <div className='property-description-txt'>
                    {data[type + "Description"]}
                </div>
            </Card>
        </div>
    )
}