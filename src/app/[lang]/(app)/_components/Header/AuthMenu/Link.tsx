import AuthMenuItem from '@/utils/dto/AuthMenuItem'
import LocaleLink from '@/app/[lang]/_components/LocaleLink'
import styles from '@/app/[lang]/(app)/_styles/header/authNavigation.module.css'

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
