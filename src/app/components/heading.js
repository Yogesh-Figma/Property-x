import Image from 'next/image';
import HorizontailGradientLine from '@/app/icons/horizontal_gradient_line.svg'


export default function Heading({ label, className="" }) {
    return (<div className='project-heading-cnt'>
        <div className={`sub-heading project-heading ${className}`}>{label}</div>
        <HorizontailGradientLine style={{display: "block", marginTop:"5px"}}/>
    </div>)
}

