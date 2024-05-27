import LanguageSwitcher from '@/components/Footer/LanguageSwitcher'
import styles from '@/utils/styles/footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <LanguageSwitcher />
        </footer>
    )
}
