'use client'

import useDictionary from '@/utils/hooks/useDictionary'

export default function LoadingScreen() {
    const dict = useDictionary()

    return (
        <div className="h-screen w-screen bg-[#1D7B2F] flex items-center justify-center">
            {dict.common.loading}
        </div>
    )
}
