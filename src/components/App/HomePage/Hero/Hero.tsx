import styles from '@/styles/pages/home/hero/hero.module.css'
import AuthOptions from '@/components/App/HomePage/Hero/AuthOptions'
import { Dictionary } from '@/app/[lang]/dictionaries'
import Contact from '@/components/App/HomePage/Hero/Contact'

export default function HomePageHero({ dict }: { dict: Dictionary }) {
    return (
        <section className={styles.heroSection}>
            <div className={styles.headingAuthOptionsAndContactBtn}>
                <div className={styles.heading1Container}>
                    <h1 className={styles.heading1}>{dict.home.title}</h1>
                </div>

                <div className={styles.authOptionsAndContactBtn}>
                    <AuthOptions />

                    <Contact dict={dict} />
                </div>
            </div>
        </section>
    )
}
