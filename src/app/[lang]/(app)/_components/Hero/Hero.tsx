import styles from '@/app/[lang]/(app)/_styles/hero/hero.module.css'
import AuthOptions from '@/app/[lang]/(app)/_components/Hero/AuthOptions'
import { Dictionary } from '@/app/[lang]/dictionaries'
import Contact from '@/app/[lang]/(app)/_components/Hero/Contact'

export default function HomePageHero({ dict }: { dict: Dictionary }) {
    return (
        <section className={styles.heroSection}>
            <div className={styles.content}>
                <div className={styles.headingAuthOptionsAndContactBtn}>
                    <div className={styles.heading1Container}>
                        <h1 className={styles.heading1}>{dict.home.title}</h1>
                    </div>

                    <div className={styles.authOptionsAndContactBtn}>
                        <AuthOptions />

                        <Contact dict={dict} />
                    </div>
                </div>
            </div>
        </section>
    )
}
