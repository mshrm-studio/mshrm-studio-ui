'use client'

import MainNavigationItem from '@/utils/dto/MainNavigationItem'
import Link from 'next/link'

type Props = {
    item: MainNavigationItem & { href: string }
}

export default function HeaderMainNavigationLink({ item }: Props) {
    return (
        <div className="flex items-center">
            {item.prependedLabel && (
                <span className="mr-2">{item.prependedLabel}</span>
            )}

            <Link
                className={`${
                    item.prependedLabel
                        ? 'underline text-black/50 dark:text-white/50'
                        : ''
                }`}
                href={item.href}
                target={item.href.includes('http') ? '_blank' : undefined}
            >
                {item.actionText}
            </Link>

            {item.appendedIcon !== undefined && (
                <item.appendedIcon className="ml-2 h-4 w-4 text-black/50 dark:text-white/50" />
            )}
        </div>
    )
}
