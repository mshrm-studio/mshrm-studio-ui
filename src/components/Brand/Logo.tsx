'use client'

import SpacesImg from '@/components/SpacesImage'
import { useMemo } from 'react'

type Props = {
    className?: string
    color?: 'black' | 'white'
    priority?: boolean
}

const BrandLogo: React.FC<Props> = ({ className, color, priority }) => {
    const imgSrc = useMemo(() => {
        return color === 'black'
            ? 'static/brand/glyph/m-glyph-black.png'
            : 'static/brand/glyph/m-glyph-white.png'
    }, [color])

    return (
        <SpacesImg
            className={className}
            src={imgSrc}
            alt={`TODO (translate): MSHRM Studio Logo (${color})`}
            priority={priority}
        />
    )
}

export default BrandLogo
