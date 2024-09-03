'use client'

import Button from '@/components/App/Button'
import Input from '@/components/App/Input/Input'
import File from '@/components/App/Input/File'
import Textarea from '@/components/App/Textarea'
import styles from '@/styles/pages/contact/form.module.css'
import useDictionary from '@/utils/hooks/useDictionary'

export default function ContactPageForm() {
    const dict = useDictionary()

    function onSubmit(_e: React.FormEvent<HTMLFormElement>) {
        // TODO
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Input
                label={dict.contact.form.name.label}
                name="name"
                placeholder={dict.contact.form.name.placeholder}
                required
            />

            <Input
                label={dict.contact.form.email.label}
                name="email"
                placeholder={dict.contact.form.email.placeholder}
                required
                type="email"
            />

            <Input
                label={dict.contact.form.website.label}
                name="website"
                placeholder={dict.contact.form.website.placeholder}
                required
                type="url"
            />

            <Textarea
                label={dict.contact.form.message.label}
                name="message"
                placeholder={dict.contact.form.message.placeholder}
                required
            />

            <File
                label={dict.contact.form.attachments.label}
                name="attachments"
                placeholder={dict.contact.form.attachments.placeholder}
                multiple
            />

            <Button
                aria-label={dict.contact.form.submit}
                title={dict.contact.form.submit}
                size="xl"
            >
                {dict.contact.form.buttonText}
            </Button>
        </form>
    )
}
