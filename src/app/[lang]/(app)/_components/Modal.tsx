'use client'

import styles from '@/app/[lang]/(app)/_styles/modal.module.css'
import React, { useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import useDictionary from '@/utils/hooks/useDictionary'

export default function Modal({
    children,
    show,
    close,
}: {
    children: React.ReactNode
    show: boolean
    close: () => void
}) {
    const dict = useDictionary()

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [show])

    if (!show) return null

    return (
        <div className={styles.modal}>
            <button
                className={styles.closeButton}
                type="button"
                aria-label={dict.common.closeModal}
                title={dict.common.closeModal}
                onClick={(_e: React.MouseEvent<HTMLButtonElement>) => close()}
            >
                <XMarkIcon className={styles.closeButtonIcon} />
            </button>

            <div className="max-w-full max-h-full overflow-y-auto p-6 py-12">
                {children}
            </div>
        </div>
    )
}
