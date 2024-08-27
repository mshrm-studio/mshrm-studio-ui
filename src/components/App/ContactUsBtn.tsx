'use client'

import { useContext } from 'react'
import Button from '@/components/App/Button'
import ContactFormModalContext from '@/utils/context/ContactFormModal'
import useDictionary from '@/utils/hooks/useDictionary'

export default function ContactUsBtn() {
    const dict = useDictionary()

    const { showContactFormModal, setShowContactFormModal } = useContext(
        ContactFormModalContext
    )

    function onClick(_e: React.MouseEvent<HTMLButtonElement>) {
        setShowContactFormModal((prev) => !prev)
    }

    if (showContactFormModal) return null

    return (
        <Button size="xl" onClick={onClick}>
            {dict.action.contactUs}
        </Button>
    )
}
