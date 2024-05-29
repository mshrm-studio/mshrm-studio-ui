'use client'

import DictionaryContext from '@/utils/context/Dictionary'
import { useContext } from 'react'
import styles from '@/utils/styles/footer/contactUs.module.css'

import { Caprasimo } from 'next/font/google'

const caprasimo = Caprasimo({
    subsets: ['latin'],
    weight: ['400'],
    style: 'normal',
})

export default function FooterContactUs() {
    const dictionary = useContext(DictionaryContext)

    if (!dictionary) {
        throw new Error('No dictionary found')
    }

    return (
        <div className={styles.container}>
            <div>
                <h2 className={styles.title}>{dictionary.action.contactUs}</h2>
            </div>

            <div className={styles.buttonAndEmail}>
                <div className={styles.buttonContainer}>
                    <button
                        className={`${caprasimo.className} ${styles.button}`}
                        type="button"
                    >
                        {dictionary.action.clickToMessageUs}
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
