'use client'

import { Bars3Icon } from '@heroicons/react/24/outline'

type Props = {
    onClick: (e: React.MouseEvent) => void
}

export default function HeaderMainNavigationToggle({ onClick }: Props) {
    return (
        <button className="dark:text-white" type="button" onClick={onClick}>
            <Bars3Icon className="h-6 w-6" />
        </button>
    )
}
