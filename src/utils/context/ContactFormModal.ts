import { createContext, Dispatch, SetStateAction } from 'react'

const ContactFormModalContext = createContext<{
    showContactFormModal: boolean
    setShowContactFormModal: Dispatch<SetStateAction<boolean>>
}>({
    showContactFormModal: false,
    setShowContactFormModal: () => {},
})

export default ContactFormModalContext
