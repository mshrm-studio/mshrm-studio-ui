import CopyToClipboard from '@/components/Admin/CopyToClipboard'
import Link from 'next/link'
import React from 'react'

export default function DataDisplayItem({
    children,
    label,
    copy,
    link,
    linkClassName,
}: {
    children: React.ReactNode
    label: string
    copy?: string
    link?: string
    linkClassName?: string
}) {
    const WrappedChildren = ({ children }: { children: React.ReactNode }) => {
        if (link) {
            return (
                <Link
                    href={link}
                    target={link.startsWith('http') ? '_blank' : undefined}
                    className={linkClassName || 'text-link'}
                >
                    {children}
                </Link>
            )
        }

        return children
    }

    return (
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">{label}</dt>

            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                {copy ? (
                    <CopyToClipboard content={copy}>
                        <WrappedChildren>{children}</WrappedChildren>
                    </CopyToClipboard>
                ) : (
                    <WrappedChildren>{children}</WrappedChildren>
                )}
            </dd>
        </div>
    )
}
