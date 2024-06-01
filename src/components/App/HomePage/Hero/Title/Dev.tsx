'use client'

import LocaleContext from '@/utils/context/Locale'
import { useContext, useMemo } from 'react'
import styles from '@/utils/styles/homepage/devTitle.module.css'
import { Locale } from '@/utils/enums/locale'
import AnimatedText from '@/components/AnimatedText'
import useDictionary from '@/utils/hooks/useDictionary'

type Props = {
    version: 'desktop' | 'mobile'
}

export default function HomePageHeroDevTitle({ version }: Props) {
    const locale = useContext(LocaleContext)

    const dict = useDictionary()

    const title = useMemo(() => {
        return dict.homepage.title.dev.desktop

        // return version === 'desktop'
        //     ? dictionary.homepage.title.dev.desktop
        //     : dictionary.homepage.title.dev.mobile
    }, [dict, version])

    const localHeading1Styles = useMemo(() => {
        switch (locale) {
            case Locale.Arabic:
                return styles.arabicHeading1
            case Locale.Chinese:
                return styles.chineseHeading1
            case Locale.German:
                return styles.germanHeading1
            case Locale.Khmer:
                return styles.khmerHeading1
            case Locale.Spanish:
                return styles.spanishHeading1
            default:
                return styles.englishHeading1
        }
    }, [locale])

    const localLine1Styles = useMemo(() => {
        switch (locale) {
            case Locale.Arabic:
                return styles.arabicLine1
            case Locale.Chinese:
                return styles.chineseLine1
            case Locale.German:
                return styles.germanLine1
            case Locale.Khmer:
                return styles.khmerLine1
            case Locale.Spanish:
                return styles.spanishLine1
            default:
                return styles.englishLine1
        }
    }, [locale])

    const localLine2Styles = useMemo(() => {
        switch (locale) {
            case Locale.Arabic:
                return styles.arabicLine2
            case Locale.Chinese:
                return styles.chineseLine2
            case Locale.German:
                return styles.germanLine2
            case Locale.Khmer:
                return styles.khmerLine2
            case Locale.Spanish:
                return styles.spanishLine2
            default:
                return styles.englishLine2
        }
    }, [locale])

    if (typeof title === 'object')
        return (
            <h1 className={`${styles.heading1} ${localHeading1Styles}`}>
                <AnimatedText
                    text={title.line1}
                    className={`${styles.line1} ${localLine1Styles}`}
                    el="div"
                />

                <AnimatedText
                    text={title.line2}
                    className={`${styles.line2} ${localLine2Styles}`}
                    el="div"
                />
            </h1>
        )

    return (
        <h1 className={`${styles.heading1} ${localHeading1Styles}`}>
            <AnimatedText text={title} el="div" />
        </h1>
    )
}
