import LocaleLink from '@/app/[lang]/_components/LocaleLink'
import MainMenuItem from '@/utils/dto/MainMenuItem'

type Props = {
    item: MainMenuItem & { href: string }
}

export default function HeaderMainMenuLink({ item }: Props) {
    return (
        <div
            className={
                item.prependedLabel || item.appendedIcon
                    ? 'flex items-center'
                    : ''
            }
        >
            {item.prependedLabel && (
                <span className="mr-3">{item.prependedLabel}</span>
            )}

            <LocaleLink
                className={
                    item.prependedLabel
                        ? 'underline text-black/50 dark:text-white/50'
                        : ''
                }
                href={item.href}
                target={item.href.includes('http') ? '_blank' : undefined}
            >
                {item.actionText}
            </LocaleLink>

            {item.appendedIcon && (
                <item.appendedIcon className="ml-2 h-4 w-4 text-black/50 dark:text-white/50" />
            )}
        </div>
    )
}
