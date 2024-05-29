import LanguageSwitcher from '@/components/Footer/LanguageSwitcher'
import styles from '@/utils/styles/footer/footer.module.css'
import ContactUs from '@/components/Footer/ContactUs'
import DictionaryContextProvider from '@/components/Context/DictionaryProvider'
import { Locale } from '@/utils/enums/locale'
import { getDictionary } from '@/app/[lang]/dictionaries'

export default async function Footer({ locale }: { locale: Locale }) {
    const dictionary = await getDictionary(locale)

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <footer className={styles.footer}>
                <ContactUs />

                <LanguageSwitcher />
            </footer>
        </DictionaryContextProvider>
    )
}
