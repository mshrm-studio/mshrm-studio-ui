'use client'

import Button from '@/components/App/Button'
import Input from '@/components/App/Input/Input'
import File from '@/components/App/Input/File'
import Textarea from '@/components/App/Textarea'
import styles from '@/styles/contactForm.module.css'
import useDictionary from '@/utils/hooks/useDictionary'

export default function ContactPageForm() {
    const dict = useDictionary()

    function onSubmit(_e: React.FormEvent<HTMLFormElement>) {
        // TODO
    }

    return (
        <form className={styles.contactForm} onSubmit={onSubmit}>
            <Input
                label={dict.contactForm.name.label}
                name="name"
                placeholder={dict.contactForm.name.placeholder}
                required
            />

            <Input
                label={dict.contactForm.email.label}
                name="email"
                placeholder={dict.contactForm.email.placeholder}
                required
                type="email"
            />

            <Input
                label={dict.contactForm.website.label}
                name="website"
                placeholder={dict.contactForm.website.placeholder}
                required
                type="url"
            />

            <Textarea
                label={dict.contactForm.message.label}
                name="message"
                placeholder={dict.contactForm.message.placeholder}
                required
            />

            <File
                label={dict.contactForm.attachments.label}
                name="attachments"
                placeholder={dict.contactForm.attachments.placeholder}
                multiple
            />

            <Button
                aria-label={`TODO (translate): Submit contact form`}
                title={`TODO (translate): Submit contact form`}
                size="xl"
            >
                {dict.contactForm.buttonText}
            </Button>
        </form>
    )
}
