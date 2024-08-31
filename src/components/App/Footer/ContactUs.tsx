'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import styles from '@/styles/footer/footer.module.css'

export default function FooterContactUs() {
    const dict = useDictionary()

    return (
        <div>
            <a
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                className={styles.email}
            >
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
            </a>
        </div>
    )
}
