'use client'

import { useContext } from 'react'
import styles from '@/utils/styles/footer/contactUs.module.css'
import { Caprasimo } from 'next/font/google'
import ContactFormModalContext from '@/utils/context/ContactFormModal'
import useDictionary from '@/utils/hooks/useDictionary'

const caprasimo = Caprasimo({
    subsets: ['latin'],
    weight: ['400'],
    style: 'normal',
})

export default function FooterContactUs() {
    const dict = useDictionary()

    const { setShowContactFormModal } = useContext(ContactFormModalContext)

    function toggleContactFormModal(_e: React.MouseEvent<HTMLButtonElement>) {
        setShowContactFormModal((prev) => !prev)
    }

    return (
        <div className={styles.container}>
            <div>
                <h2 className={styles.title}>{dict.action.contactUs}</h2>
            </div>

            <div className={styles.buttonAndEmail}>
                <div className={styles.buttonContainer}>
                    <button
                        className={`${caprasimo.className} ${styles.button}`}
                        onClick={toggleContactFormModal}
                        type="button"
                    >
                        {dict.action.clickToMessageUs}
                    </button>
                </div>

                <div className={styles.emailContainer}>
                    <a
                        className={styles.email}
                        href="mailto:hello@mshrm.studio"
                    >
                        hello@mshrm.studio
                    </a>
                </div>
            </div>
        </div>
    )
}
