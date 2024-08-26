'use client'

import SpacesImg from '@/components/SpacesImg'
import { useMemo } from 'react'

type Props = {
    className?: string
    color?: 'black' | 'white'
}

const BrandLogo: React.FC<Props> = ({ className, color }) => {
    const imgSrc = useMemo(() => {
        return color === 'black'
            ? 'static/brand/MshrmStudioLogoBlack.svg'
            : 'static/brand/MshrmStudioLogoWhite.svg'
    }, [color])

    return (
        <SpacesImg
            className={className}
            src={imgSrc}
            alt={`TODO (translate): MSHRM Studio Logo (${color})`}
        />
    )
}

export default BrandLogo
