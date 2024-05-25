'use client'

import SpacesImg from '@/components/SpacesImg'

type Props = {
    className?: string
}

const BrandLogo: React.FC<Props> = ({ className }) => {
    return (
        <SpacesImg
            className={className}
            src="static/brand/MshrmStudioLogoBlack.svg"
            alt="Mshrm Studio Logo (Black)"
        />
    )
}

export default BrandLogo
