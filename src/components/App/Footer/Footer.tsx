import LanguageSwitcher from '@/components/App/Footer/LanguageSwitcher'
import styles from '@/utils/styles/footer/footer.module.css'
import ContactUs from '@/components/App/Footer/ContactUs'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import { Locale } from '@/utils/enums/Locale'
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
