import styles from '@/styles/homepage/hero.module.css'
import Map from '@/components/App/HomePage/Hero/Map'
import AuthOptions from '@/components/App/HomePage/Hero/AuthOptions'
import { Dictionary } from '@/app/[lang]/dictionaries'
import Contact from '@/components/App/HomePage/Hero/Contact'

export default function HomePageHero({ dict }: { dict: Dictionary }) {
    return (
        <section className={styles.heroSection}>
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

                    <Contact />
                </div>
            </div>
        </section>
    )
}
