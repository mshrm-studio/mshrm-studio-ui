import styles from '@/app/[lang]/(app)/_styles/footer/footer.module.css'

export default function FooterContactUs() {
    return (
        <div>
            <a
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                className={styles.email}
            >
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
            </a>
        </div>
    )
}
