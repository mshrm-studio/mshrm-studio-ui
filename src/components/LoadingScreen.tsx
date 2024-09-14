'use client'

import SpacesImage from '@/components/SpacesImage'
import useDictionary from '@/utils/hooks/useDictionary'
import { useEffect } from 'react'

export default function LoadingScreen() {
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
            <SpacesImage
                alt={dict.common.loading}
                src="static/misc/loading.gif"
                height={50}
                width={50}
            />
        </div>
    )
}
