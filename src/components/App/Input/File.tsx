'use client'

import styles from '@/styles/input/file.module.css'
import { useMemo, useState } from 'react'
import FormField from '@/components/App/FormField'
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import InputUploadedFile from '@/components/App/Input/UploadedFile'
import TemporaryFile from '@/utils/dto/TemporaryFile'
import InputTemporaryFile from '@/components/App/Input/TemporaryFile'

type Props = {
    accept?: string
    id?: string
    label?: string
    multiple?: boolean
    name: string
    placeholder?: string
    required?: boolean
    temporaryFiles: TemporaryFile[]
    setTemporaryFiles: React.Dispatch<React.SetStateAction<TemporaryFile[]>>
}

export default function Input({
    accept = '*',
    id,
    label,
    multiple,
    name,
    placeholder,
    required,
    temporaryFiles,
    setTemporaryFiles,
}: Props) {
    const labelWithAsterisk = useMemo(() => {
        if (!label) return undefined

        return required ? `${label}*` : label
    }, [label, required])

    const placeholderWithAsterisk = useMemo(() => {
        if (!placeholder) return undefined

        return required ? `${placeholder}*` : placeholder
    }, [placeholder, required])

    const [uploadedFiles, setUploadedFiles] = useState<File[]>()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (files) {
            setUploadedFiles((prev) => [...(prev || []), ...Array.from(files)])
        }
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

            {uploadedFiles && (
                <div className="mt-3 space-y-3">
                    <ul className="mt-3 space-y-3">
                        {uploadedFiles.map((uploadedFile, i) => (
                            <li key={`${uploadedFile.name}-${i}`}>
                                <InputUploadedFile
                                    file={uploadedFile}
                                    setTemporaryFiles={setTemporaryFiles}
                                />
                            </li>
                        ))}
                    </ul>

                    {temporaryFiles && (
                        <ul className="mt-3 space-y-3">
                            {temporaryFiles.map((temporaryFile, i) => (
                                <li key={temporaryFile.key}>
                                    <InputTemporaryFile
                                        file={temporaryFile}
                                        setTemporaryFiles={setTemporaryFiles}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </FormField>
    )
}
