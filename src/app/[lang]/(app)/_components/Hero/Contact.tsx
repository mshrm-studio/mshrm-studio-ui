import { Dictionary } from '@/app/[lang]/dictionaries'
import Button from '@/app/[lang]/(app)/_components/Button'
import styles from '@/app/[lang]/(app)/_styles/hero/hero.module.css'

export default function HomePageHeroContact({ dict }: { dict: Dictionary }) {
    return (
        <div className={styles.contactBtnContainer}>
            <a href="/contact">
                <Button
                    aria-label={dict.home.goToContactPage}
                    title={dict.home.goToContactPage}
                    size="xl"
                >
                    {dict.home.contact}
                </Button>
            </a>
        </div>
    )
}
