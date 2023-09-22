import Image from 'next/image';
import horizontailGradientLine from '@/app/icons/horizontal_gradient_line.svg'


export default function Heading({ label }) {
    return (<>
        <div className='sub-heading project-heading'>{label}</div>
        <Image src={horizontailGradientLine} height={4} width={64} />
    </>)
}

