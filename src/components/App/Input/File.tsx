'use client'

import styles from '@/styles/input/file.module.css'
import { useMemo, useState } from 'react'
import FormField from '@/components/App/FormField'
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import InputAddedFile from '@/components/App/Input/AddedFile'

type Props = {
    accept?: string
    id?: string
    label?: string
    multiple?: boolean
    name: string
    placeholder?: string
    required?: boolean
}

export default function Input({
    accept = '*',
    id,
    label,
    multiple,
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

    const [addedFiles, setAddedFiles] = useState<File[] | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (files) {
            setAddedFiles((prev) => [...(prev || []), ...Array.from(files)])
        }
    }

    const handleFileRemove = (fileIndex: number) => {
        setAddedFiles(
            (prev) => prev?.filter((_, index) => index !== fileIndex) || null
        )
    }

    return (
        <FormField fieldId={id || name} label={labelWithAsterisk}>
            <label htmlFor={id || name} className={styles.label}>
                <div className={styles.labelContent}>
                    <span className={styles.labelText}>
                        {placeholderWithAsterisk}
                    </span>

                    <ArrowUpTrayIcon className={styles.labelIcon} />
                </div>

                <input
                    accept={accept}
                    id={id || name}
                    className="sr-only"
                    name={name}
                    placeholder={placeholderWithAsterisk}
                    type="file"
                    multiple={multiple}
                    onChange={handleFileChange}
                />
            </label>

            {addedFiles && (
                <ul className="mt-3 space-y-3">
                    {addedFiles.map((addedFile, i) => (
                        <li key={`${addedFile.name}-${i}`}>
                            <InputAddedFile
                                addedFile={addedFile}
                                onRemoveClick={() => handleFileRemove(i)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </FormField>
    )
}
