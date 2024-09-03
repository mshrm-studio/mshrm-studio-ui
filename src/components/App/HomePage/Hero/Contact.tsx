import { Dictionary } from '@/app/[lang]/dictionaries'
import Button from '@/components/App/Button'
import styles from '@/styles/homepage/hero.module.css'

export default function HomePageHeroContact({ dict }: { dict: Dictionary }) {
    return (
        <div className={styles.contactBtnContainer}>
            <a href="/contact">
                <Button
                    aria-label={`TODO (translate): Go to contact page`}
                    title={`TODO (translate): Go to contact page`}
                    size="xl"
                >
                    {dict.action.contactUs}
                </Button>
            </a>
        </div>
    )
}
