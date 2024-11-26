'use client'

import { useEffect } from 'react'
import LoadingImage from '@/components/LoadingImage'

export default function LoadingScreen() {
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
            <LoadingImage height={50} width={50} priority />
        </div>
    )
}
