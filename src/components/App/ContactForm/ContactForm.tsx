'use client'

import Button from '@/components/App/Button'
import Input from '@/components/App/Input/Input'
import styles from '@/styles/contactForm.module.css'
import useDictionary from '@/utils/hooks/useDictionary'

export default function ContactForm() {
    const dict = useDictionary()

    function onSubmit(_e: React.FormEvent<HTMLFormElement>) {
        // TODO
    }

    return (
        <form className={styles.contactForm} onSubmit={onSubmit}>
            <div>
                <Input
                    name="name"
                    placeholder={dict.contactForm.name.placeholder}
                    required
                />
            </div>

            <div>
                <Input
                    name="email"
                    placeholder={dict.contactForm.email.placeholder}
                    required
                    type="email"
                />
            </div>

            <div>
                <Input
                    name="website"
                    placeholder={dict.contactForm.website.placeholder}
                    required
                    type="url"
                />
            </div>

            <Button>{dict.action.contactUs}</Button>
        </form>
    )
}
