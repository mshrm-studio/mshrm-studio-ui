'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import styles from '@/styles/footer/footer.module.css'

export default function FooterContactUs() {
    const dict = useDictionary()

    return (
        <div>
            <a href="mailto:tom@mshrm.studio" className={styles.email}>
                tom@mshrm.studio
            </a>
        </div>
    )
}
