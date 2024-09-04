import { Dictionary } from '@/app/[lang]/dictionaries'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
    dict: Dictionary
    menuVisible: boolean
    onClick: (e: React.MouseEvent) => void
}

export default function HeaderMainMenuToggle({
    dict,
    menuVisible,
    onClick,
}: Props) {
    return (
        <button
            className="dark:text-white"
            type="button"
            aria-label={
                menuVisible ? dict.header.closeMenu : dict.header.openMenu
            }
            title={menuVisible ? dict.header.closeMenu : dict.header.openMenu}
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
