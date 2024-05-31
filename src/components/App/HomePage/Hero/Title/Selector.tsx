'use client'

import {
    homepageHeroTitles,
    HomepageHeroTitle,
} from '@/utils/enums/homepageHeroTitle'
import React, { Dispatch, SetStateAction, useMemo } from 'react'

type Props = {
    activeTitle: HomepageHeroTitle
    setActiveTitle: Dispatch<SetStateAction<HomepageHeroTitle>>
}

export default function HomePageHeroTitleSelector({
    activeTitle,
    setActiveTitle,
}: Props) {
    const options = useMemo(() => {
        return homepageHeroTitles.map((title) => ({
            title: title,
            active: activeTitle === title,
        }))
    }, [activeTitle])

    return (
        <div className="flex flex-col space-y-2">
            {options.map((option, i) => (
                <button
                    key={i}
                    className={`w-[6px] h-[27px] ${
                        option.active
                            ? 'bg-black dark:bg-white'
                            : 'bg-[#D9D9D9] dark:bg-[#D9D9D9]/50'
                    }`}
                    type="button"
                    onClick={() => setActiveTitle(option.title)}
                ></button>
            ))}
        </div>
    )
}
