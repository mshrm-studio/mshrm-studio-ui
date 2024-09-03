import ClientDto from '@/utils/dto/Client'
import SpacesImg from '@/components/SpacesImage'
import styles from '@/styles/client.module.css'
import { Dictionary } from '@/app/[lang]/dictionaries'

export default function Client({
    client,
    dict,
}: {
    client: ClientDto
    dict: Dictionary
}) {
    const sizes = '(max-width: 768px) 100px, (max-width: 1024px) 150px, 210px'

    return (
        <>
            <SpacesImg
                className={`${styles.clientImg} ${styles.lightClientImg}`}
                imgClassName="object-contain"
                src={`static/companies/${client.lightLogoUrl}`}
                alt={dict.common.lightEntityLogo.replace(
                    ':entity',
                    client.name
                )}
                sizes={sizes}
            />

            <SpacesImg
                className={`${styles.clientImg} ${styles.darkClientImg}`}
                imgClassName="object-contain"
                src={`static/companies/${client.darkLogoUrl}`}
                alt={dict.common.darkEntityLogo.replace(':entity', client.name)}
                sizes={sizes}
            />
        </>
    )
}
