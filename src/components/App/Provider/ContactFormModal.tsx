'use client'

import ContactFormModalContext from '@/utils/context/ContactFormModal'
import { useState } from 'react'

export default function ThemeContextProvider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [showContactFormModal, setShowContactFormModal] =
        useState<boolean>(false)

    return (
        <ContactFormModalContext.Provider
            value={{ showContactFormModal, setShowContactFormModal }}
        >
            {children}
        </ContactFormModalContext.Provider>
    )
}
