'use client'

import DictionaryContext from '@/utils/context/Dictionary'
import { useContext, useMemo } from 'react'

type Props = {
    version: 'desktop' | 'mobile'
}

export default function HomePageHeroArtTitle({ version }: Props) {
    const dictionary = useContext(DictionaryContext)

    if (!dictionary) {
        throw new Error('No dictionary found')
    }

    const title = useMemo(() => {
        return version === 'desktop'
            ? dictionary.homepage.title.art.desktop
            : dictionary.homepage.title.art.mobile
    }, [version])

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
