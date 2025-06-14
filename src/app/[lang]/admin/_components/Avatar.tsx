'use client'

import {
    Avatar as ShadcnuiAvatar,
    AvatarFallback,
    AvatarImage,
} from '@/app/[lang]/admin/_components/shadcnui/avatar'
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
    const blobStorageUrl = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL

    const imgSrc = useMemo(() => {
        if (!src) return ''

        return src.startsWith('http')
            ? src
            : src.startsWith('/')
            ? `${blobStorageUrl}${src}`
            : `${blobStorageUrl}/${src}`
    }, [blobStorageUrl, src])

    return (
        <ShadcnuiAvatar>
            <AvatarImage src={imgSrc} alt={alt} />

            {fallback && <AvatarFallback>{fallback}</AvatarFallback>}
        </ShadcnuiAvatar>
    )
}
