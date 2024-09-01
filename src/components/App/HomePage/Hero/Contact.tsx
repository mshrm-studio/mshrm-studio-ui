'use client'

import Button from '@/components/App/Button'
import styles from '@/styles/homepage/hero.module.css'
import ContactFormModalContext from '@/utils/context/ContactFormModal'
import useDictionary from '@/utils/hooks/useDictionary'
import { useContext } from 'react'

export default function HomePageHeroContact() {
    const dict = useDictionary()

    const { setShowContactFormModal } = useContext(ContactFormModalContext)

    function onClick(_e: React.MouseEvent<HTMLButtonElement>) {
        setShowContactFormModal((prev) => !prev)
    }

    return (
        <div className={styles.contactBtnContainer}>
            <Button
                aria-label={`TODO (translate): Open contact form`}
                title={`TODO (translate): Open contact form`}
                size="xl"
                onClick={onClick}
            >
                {dict.action.contactUs}
            </Button>
        </div>
    )
}
