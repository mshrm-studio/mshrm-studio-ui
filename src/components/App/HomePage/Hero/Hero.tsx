'use client'

import DimensionsContext from '@/utils/context/Dimensions'
import useDictionary from '@/utils/hooks/useDictionary'
import { useContext, useMemo } from 'react'
import Button from '@/components/App/Button'
import styles from '@/styles/homepage/hero.module.css'
import Map from '@/components/App/HomePage/Hero/Map'
import AuthOptions from '@/components/App/HomePage/Hero/AuthOptions'
import ContactFormModalContext from '@/utils/context/ContactFormModal'

export default function HomePageHero() {
    const dict = useDictionary()
    const { dimensions } = useContext(DimensionsContext)

    const sectionHeight = useMemo(() => {
        return dimensions.viewportHeight - dimensions.headerHeight
    }, [dimensions.headerHeight, dimensions.viewportHeight])

    const { showContactFormModal, setShowContactFormModal } = useContext(
        ContactFormModalContext
    )

    function onClick(_e: React.MouseEvent<HTMLButtonElement>) {
        setShowContactFormModal((prev) => !prev)
    }

    return (
        <section
            className={styles.heroSection}
            style={{ minHeight: sectionHeight }}
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
                        <Button size="xl" onClick={onClick}>
                            {dict.action.contactUs}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
