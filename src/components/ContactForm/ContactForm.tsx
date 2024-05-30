'use client'

import DictionaryContext from '@/utils/context/Dictionary'
import { useContext } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input/Input'
import styles from '@/utils/styles/contactForm.module.css'

export default function ContactForm() {
    const dictionary = useContext(DictionaryContext)

    if (!dictionary) {
        throw new Error('No dictionary found')
    }

    function onSubmit(_e: React.FormEvent<HTMLFormElement>) {
        // TODO
    }

    return (
        <form className={styles.contactForm} onSubmit={onSubmit}>
            <div>
                <Input
                    name="name"
                    placeholder={dictionary.contactForm.name.placeholder}
                    required
                />
            </div>

            <div>
                <Input
                    name="email"
                    placeholder={dictionary.contactForm.email.placeholder}
                    required
                    type="email"
                />
            </div>

            <div>
                <Input
                    name="website"
                    placeholder={dictionary.contactForm.website.placeholder}
                    required
                    type="url"
                />
            </div>

            <Button>{dictionary.action.contactUs}</Button>
        </form>
    )
}
