'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import { useTheme } from 'next-themes'
import BlobImage from '@/components/BlobImage'

type Props = {
    height: number
    priority: boolean
    width: number
}

export default function LoadingImage({ height, priority, width }: Props) {
    const { resolvedTheme } = useTheme()
    const dict = useDictionary()

    return (
        <BlobImage
            alt={dict.common.loading}
            src={
                resolvedTheme === 'dark'
                    ? 'static/misc/m-loader-64-darkmode.gif'
                    : 'static/misc/m-loader-64-lightmode.gif'
            }
            height={height}
            width={width}
            priority={priority}
        />
    )
}
