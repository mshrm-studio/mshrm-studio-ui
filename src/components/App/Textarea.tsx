import styles from '@/styles/textarea.module.css'
import { useMemo } from 'react'
import FormField from '@/components/App/FormField'

type Props = {
    id?: string
    label?: string
    name: string
    placeholder?: string
    required?: boolean
}

export default function Input({
    id,
    label,
    name,
    placeholder,
    required,
}: Props) {
    const labelWithAsterisk = useMemo(() => {
        if (!label) return undefined

        return required ? `${label}*` : label
    }, [label, required])

    const placeholderWithAsterisk = useMemo(() => {
        if (!placeholder) return undefined

        return required ? `${placeholder}*` : placeholder
    }, [placeholder, required])

    const invalid = useMemo(() => {
        return false
    }, [])

    return (
        <FormField fieldId={id || name} label={labelWithAsterisk}>
            <textarea
                id={id || name}
                className={`${styles.textarea} ${
                    invalid ? styles.invalid : ''
                }`}
                name={name}
                placeholder={placeholderWithAsterisk}
                required={required}
            ></textarea>
        </FormField>
    )
}
