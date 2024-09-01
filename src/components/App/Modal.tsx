'use client'

import styles from '@/styles/modal.module.css'
import React, { useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'

export default function Modal({
    children,
    show,
    close,
}: {
    children: React.ReactNode
    show: boolean
    close: () => void
}) {
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
                aria-label={`TODO (translate): Close Modal`}
                title={`TODO (translate): Close Modal`}
                onClick={(_e: React.MouseEvent<HTMLButtonElement>) => close()}
            >
                <XMarkIcon className={styles.closeButtonIcon} />
            </button>

            <div className="max-w-full max-h-full overflow-y-auto px-6">
                {children}
            </div>
        </div>
    )
}
