import ClientDto from '@/utils/dto/Client'
import styles from '@/app/[lang]/(app)/_styles/client.module.css'
import { Dictionary } from '@/app/[lang]/dictionaries'
import BlobImage from '@/app/[lang]/_components/BlobImage'
import clsx from 'clsx'

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
            <BlobImage
                className={clsx(styles.clientImg, styles.lightClientImg)}
                imgClassName="object-contain"
                src={client.lightLogoUrl}
                alt={dict.common.lightEntityLogo.replace(
                    ':entity',
                    client.name
                )}
                sizes={sizes}
            />

            <BlobImage
                className={clsx(styles.clientImg, styles.darkClientImg)}
                imgClassName="object-contain"
                src={client.darkLogoUrl}
                alt={dict.common.darkEntityLogo.replace(':entity', client.name)}
                sizes={sizes}
            />
        </>
    )
}
