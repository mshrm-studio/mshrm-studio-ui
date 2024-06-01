'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import { useMemo } from 'react'

type Props = {
    version: 'desktop' | 'mobile'
}

export default function HomePageHeroDesignTitle({ version }: Props) {
    const dict = useDictionary()

    const title = useMemo(() => {
        return version === 'desktop'
            ? dict.homepage.title.design.desktop
            : dict.homepage.title.design.mobile
    }, [dict, version])

    if (typeof title === 'object')
        return (
            <h1 className="font-bold text-[100px]">
                <span
                    className="block text-left leading-[1]"
                    dangerouslySetInnerHTML={{
                        __html: title.line1,
                    }}
                ></span>

                <span
                    className="block text-right leading-[1]"
                    dangerouslySetInnerHTML={{
                        __html: title.line2,
                    }}
                ></span>
            </h1>
        )

    return (
        <h1
            className="text-[80px] leading-[1] font-extrabold xl:text-[131px]"
            dangerouslySetInnerHTML={{
                __html: title,
            }}
        ></h1>
    )
}
