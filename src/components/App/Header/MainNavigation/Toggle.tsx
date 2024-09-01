'use client'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
    menuVisible: boolean
    onClick: (e: React.MouseEvent) => void
}

export default function HeaderMainNavigationToggle({
    menuVisible,
    onClick,
}: Props) {
    return (
        <button
            className="dark:text-white"
            type="button"
            aria-label={`TODO (translate): ${
                menuVisible ? 'Close menu' : 'Open menu'
            }`}
            title={`TODO (translate): ${
                menuVisible ? 'Close menu' : 'Open menu'
            }`}
            onClick={onClick}
        >
            {menuVisible ? (
                <XMarkIcon className="h-6 w-6" />
            ) : (
                <Bars3Icon className="h-6 w-6" />
            )}
        </button>
    )
}
