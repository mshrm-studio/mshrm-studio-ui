import AuthMenuItem from '@/utils/dto/AuthMenuItem'
import styles from '@/styles/header/authNavigation.module.css'
import LocaleLink from '@/components/LocaleLink'

type Props = {
    item: AuthMenuItem & { href: string }
}

export default function HeaderAuthMenuLink({ item }: Props) {
    return (
        <div>
            <LocaleLink
                className={styles.link}
                href={item.href}
                target={item.href.includes('http') ? '_blank' : undefined}
            >
                {item.actionText}
            </LocaleLink>
        </div>
    )
}
