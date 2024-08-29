'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'

type Props = {
    alt: string
    className?: string
    imgClassName?: string
    priority?: boolean
    src: string
}

const SpacesImage: React.FC<Props> = ({
    alt,
    className = 'relative',
    imgClassName = 'object-cover',
    priority,
    src,
}) => {
    const spacesStorageUrl = process.env.NEXT_PUBLIC_DO_STORAGE_URL

    const fullImageSrc = useMemo(() => {
        return src.startsWith('http')
            ? src
            : src.startsWith('/')
            ? spacesStorageUrl + src
            : `${spacesStorageUrl}/${src}`
    }, [src])

    return (
        <div className={`${className} relative`}>
            <Image
                src={fullImageSrc}
                fill
                className={imgClassName}
                priority={priority}
                alt={alt}
            />
        </div>
    )
}

export default SpacesImage
