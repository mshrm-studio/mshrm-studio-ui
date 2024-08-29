'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import styles from '@/styles/footer/footer.module.css'

export default function FooterContactUs() {
    const dict = useDictionary()

    return (
        <div>
            <a href="mailto:hello@mshrm.studio" className={styles.email}>
                hello@mshrm.studio
            </a>
        </div>
    )
}
