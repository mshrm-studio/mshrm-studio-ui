'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import BlobImage from '@/components/BlobImage'

export default function LoadingScreen() {
    const { resolvedTheme } = useTheme()
    const dict = useDictionary()

    useEffect(() => {
        // Hide scrollbar when component is mounted
        document.body.style.overflow = 'hidden'

        // Cleanup function to show scrollbar again when component is unmounted
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    return (
        <div className="fixed z-[999] inset-0 bg-black flex items-center justify-center">
            <BlobImage
                alt={dict.common.loading}
                src={
                    resolvedTheme === 'dark'
                        ? 'static/misc/m-loader-64-darkmode.gif'
                        : 'static/misc/m-loader-64-lightmode.gif'
                }
                height={50}
                width={50}
                priority
            />
        </div>
    )
}
