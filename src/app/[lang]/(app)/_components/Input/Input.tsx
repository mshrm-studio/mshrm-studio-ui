import styles from '@/app/[lang]/(app)/_styles/input/input.module.css'
import { forwardRef, useMemo } from 'react'
import FormField from '@/app/[lang]/(app)/_components/FormField'
import { FieldError } from 'react-hook-form'
import clsx from 'clsx'

type Props = {
    error?: FieldError
    id?: string
    label?: string
    name: string
    placeholder?: string
    required?: boolean
    type?: 'text' | 'email' | 'url'
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = forwardRef<HTMLInputElement, Props>(function Input(
    {
        error,
        id,
        label,
        name,
        placeholder,
        required,
        type = 'text',
        value,
        onChange,
    }: Props,
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
            <input
                id={id || name}
                className={clsx(styles.input, invalid ? styles.invalid : '')}
                name={name}
                placeholder={placeholderWithAsterisk}
                ref={ref}
                required={required}
                type={type}
                value={value}
                onChange={onChange}
            />
        </FormField>
    )
})

export default Input
