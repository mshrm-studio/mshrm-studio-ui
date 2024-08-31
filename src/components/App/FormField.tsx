import styles from '@/styles/input.module.css'
import React, { useMemo } from 'react'

type Props = {
    children: React.ReactNode
    fieldId?: string
    label?: string
}

export default function FormField({ children, fieldId, label }: Props) {
    return (
        <div>
            {label && (
                <div className="mb-1">
                    <label
                        htmlFor={fieldId}
                        className="text-[#555555] font-extrabold"
                    >
                        {label}
                    </label>
                </div>
            )}

            {children}
        </div>
    )
}
