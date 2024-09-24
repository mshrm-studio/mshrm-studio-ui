import { Dictionary } from '@/app/[lang]/dictionaries'
import Button from '@/components/App/Button'
import styles from '@/styles/pages/home/hero/hero.module.css'

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
