'use client'

import DimensionsContext from '@/utils/context/Dimensions'
import useDictionary from '@/utils/hooks/useDictionary'
import { useContext, useMemo } from 'react'
import ContactUsBtn from '@/components/App/ContactUsBtn'
import styles from '@/styles/homepage/hero.module.css'
import Map from '@/components/App/HomePage/Hero/Map'
import AuthOptions from '@/components/App/HomePage/Hero/AuthOptions'

export default function HomePageHero() {
    const dict = useDictionary()
    const { dimensions } = useContext(DimensionsContext)

    const sectionHeight = useMemo(() => {
        return dimensions.viewportHeight - dimensions.headerHeight
    }, [dimensions.headerHeight, dimensions.viewportHeight])

    return (
        <section
            className={styles.heroSection}
            style={{ height: sectionHeight }}
        >
            <div className={styles.mapWrapper}>
                <div className={styles.mapContainer}>
                    <Map />
                </div>
            </div>

            <div className={styles.headingAuthOptionsAndContactBtn}>
                <div className={styles.heading1Container}>
                    <h1 className={styles.heading1}>{dict.homepage.title}</h1>
                </div>

                <div className={styles.authOptionsAndContactBtn}>
                    <AuthOptions />

                    <div className={styles.contactBtnContainer}>
                        <ContactUsBtn />
                    </div>
                </div>
            </div>
        </section>
    )
}
