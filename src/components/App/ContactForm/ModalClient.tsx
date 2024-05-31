'use client'

import ContactFormModalContext from '@/utils/context/ContactFormModal'
import { useContext } from 'react'
import ContactForm from '@/components/App/ContactForm/ContactForm'
import Modal from '@/components/App/Modal'

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
