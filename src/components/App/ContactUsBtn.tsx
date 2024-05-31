'use client'

import DictionaryContext from '@/utils/context/Dictionary'
import { useContext } from 'react'
import Button from '@/components/App/Button'
import ContactFormModalContext from '@/utils/context/ContactFormModal'

export default function ContactUsBtn() {
    const { showContactFormModal, setShowContactFormModal } = useContext(
        ContactFormModalContext
    )

    const dictionary = useContext(DictionaryContext)

    if (!dictionary) {
        throw new Error('No dictionary found')
    }

    function onClick(_e: React.MouseEvent<HTMLButtonElement>) {
        setShowContactFormModal((prev) => !prev)
    }

    if (showContactFormModal) return null

    return (
        <Button size="threexl" onClick={onClick}>
            {dictionary.action.contactUs}
        </Button>
    )
}
