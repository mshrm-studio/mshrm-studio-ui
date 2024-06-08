'use client'

import {
    Avatar as ShadcnuiAvatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/Admin/shadcnui/avatar'
import { useMemo } from 'react'

export default function Avatar({
    alt,
    src,
    fallback,
}: {
    alt: string
    src: string
    fallback?: string
}) {
    const spacesStorageUrl = process.env.NEXT_PUBLIC_DO_STORAGE_URL

    const imgSrc = useMemo(() => {
        return src.startsWith('http')
            ? src
            : src.startsWith('/')
            ? `${spacesStorageUrl}${src}`
            : `${spacesStorageUrl}/${src}`
    }, [src])

    return (
        <ShadcnuiAvatar>
            <AvatarImage src={imgSrc} alt={alt} />

            {fallback && <AvatarFallback>{fallback}</AvatarFallback>}
        </ShadcnuiAvatar>
    )
}
