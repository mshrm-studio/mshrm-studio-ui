import LanguageSwitcher from '@/components/Footer/LanguageSwitcher'
import ContactFormModal from '@/components/ContactForm/Modal'

export default function Footer() {
    return (
        <footer>
            <ContactFormModal />

            <LanguageSwitcher />
        </footer>
    )
}
