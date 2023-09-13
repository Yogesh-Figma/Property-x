import Link from 'next/link'
import Button from './button'

export default function NextLinkButton({ href, aClassName, ...props }) {

    return (
        <Link href={href} className={aClassName} passHref>
            <Button {...props}/>
        </Link>
    )
}