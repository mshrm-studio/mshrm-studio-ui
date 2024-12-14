'use client'

import Button from '@/components/App/Button'
import Input from '@/components/App/Input/Input'
import InputFile from '@/components/App/Input/File'
import Textarea from '@/components/App/Textarea'
import styles from '@/styles/pages/contact/form.module.css'
import useDictionary from '@/utils/hooks/useDictionary'
import { useMemo, useState } from 'react'
import TemporaryFile from '@/utils/dto/TemporaryFile'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import CreateContactForm from '@/utils/dto/Create/ContactForm'
import useProcessingStatus from '@/utils/hooks/useProcessingStatus'
import useAxios from '@/utils/hooks/useAxios'

export default function ContactPageForm() {
    const dict = useDictionary()
    const axios = useAxios()
    const { startProcessing, status, stopProcessing } = useProcessingStatus()
    const [temporaryFiles, setTemporaryFiles] = useState<TemporaryFile[]>([])
    const formSchema = useMemo(() => {
        return z.object({
            contactEmail: z.string().email({ message: dict.form.rule.email }),
            firstName: z
                .string()
                .min(2, {
                    message: dict.form.rule.min.length.replace(':minimum', '2'),
                })
                .max(50, {
                    message: dict.form.rule.max.length.replace(
                        ':maximum',
                        '50'
                    ),
                }),
            lastName: z
                .string()
                .min(2, {
                    message: dict.form.rule.min.length.replace(':minimum', '2'),
                })
                .max(50, {
                    message: dict.form.rule.max.length.replace(
                        ':maximum',
                        '50'
                    ),
                }),
            message: z
                .string()
                .min(5, {
                    message: dict.form.rule.min.length.replace(':minimum', '5'),
                })
                .max(5000, {
                    message: dict.form.rule.max.length.replace(
                        ':maximum',
                        '5000'
                    ),
                }),
            websiteUrl: z.string().url({ message: dict.form.rule.url }),
        })
    }, [dict])

    const { control, formState, handleSubmit } = useForm<
        z.infer<typeof formSchema>
    >({
        resolver: zodResolver(formSchema),
        defaultValues: {
            contactEmail: '',
            firstName: '',
            lastName: '',
            message: '',
            websiteUrl: '',
        },
    })

    const onSubmit: SubmitHandler<Omit<CreateContactForm, 'attachmentKeys'>> = (
        data
    ) => {
        const form = {
            ...data,
            attachmentKeys: temporaryFiles.map((file) => file.key),
        }

        axios
            .post(`/api/v1/contact-forms`, form)
            .then((res) => {
                alert('Check console for response')
            })
            .catch(console.log)

        // TODO
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        error={formState.errors.firstName}
                        label={dict.contact.form.name.label}
                        name="firstName"
                        placeholder={dict.contact.form.name.placeholder}
                        required
                    />
                )}
            />

            <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        error={formState.errors.lastName}
                        label={dict.contact.form.name.label}
                        name="lastName"
                        placeholder={dict.contact.form.name.placeholder}
                        required
                    />
                )}
            />

            <Controller
                name="contactEmail"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        error={formState.errors.contactEmail}
                        label={dict.contact.form.email.label}
                        name="contactEmail"
                        placeholder={dict.contact.form.email.placeholder}
                        required
                        type="email"
                    />
                )}
            />

            <Controller
                name="websiteUrl"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        error={formState.errors.websiteUrl}
                        label={dict.contact.form.website.label}
                        name="websiteUrl"
                        placeholder={dict.contact.form.website.placeholder}
                        required
                        type="url"
                    />
                )}
            />

            <Controller
                name="message"
                control={control}
                render={({ field }) => (
                    <Textarea
                        {...field}
                        error={formState.errors.message}
                        label={dict.contact.form.message.label}
                        name="message"
                        placeholder={dict.contact.form.message.placeholder}
                        required
                    />
                )}
            />

            <InputFile
                label={dict.contact.form.attachments.label}
                name="attachments"
                placeholder={dict.contact.form.attachments.placeholder}
                multiple
                temporaryFiles={temporaryFiles}
                setTemporaryFiles={setTemporaryFiles}
            />

            <Button
                aria-label={dict.contact.form.submit}
                title={dict.contact.form.submit}
                size="xl"
                type="submit"
            >
                {dict.contact.form.buttonText}
            </Button>
        </form>
    )
}
