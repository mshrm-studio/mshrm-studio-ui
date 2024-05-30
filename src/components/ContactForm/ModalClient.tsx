'use client'

import ContactFormModalContext from '@/utils/context/ContactFormModal'
import { useContext } from 'react'
import ContactForm from '@/components/ContactForm/ContactForm'
import Modal from '@/components/Modal'

export default function ContactFormModalClient() {
    const { showContactFormModal, setShowContactFormModal } = useContext(
        ContactFormModalContext
    )

    return (
        <Modal
            show={showContactFormModal}
            close={() => setShowContactFormModal(false)}
        >
            <ContactForm />
        </Modal>
    )
}
