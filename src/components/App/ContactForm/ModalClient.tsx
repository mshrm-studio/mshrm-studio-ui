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
            <div className="mb-8">
                <a
                    href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                    className="uppercase font-extrabold text-xl"
                >
                    {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                </a>
            </div>

            <ContactForm />
        </Modal>
    )
}
