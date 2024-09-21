import styles from '@/styles/textarea.module.css'
import { forwardRef, useMemo } from 'react'
import FormField from '@/components/App/FormField'
import { FieldError } from 'react-hook-form'

type Props = {
    error?: FieldError
    id?: string
    label?: string
    name: string
    placeholder?: string
    required?: boolean
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(function Textarea(
    { error, id, label, name, placeholder, required, value, onChange }: Props,
    ref
) {
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
        <FormField
            errorMessage={error?.message}
            fieldId={id || name}
            label={labelWithAsterisk}
        >
            <textarea
                id={id || name}
                className={`${styles.textarea} ${
                    invalid ? styles.invalid : ''
                }`}
                name={name}
                placeholder={placeholderWithAsterisk}
                ref={ref}
                required={required}
                value={value}
                onChange={onChange}
            ></textarea>
        </FormField>
    )
})

export default Textarea
