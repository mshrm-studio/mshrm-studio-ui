'use client'

import ClientDto from '@/utils/dto/Client'
import SpacesImg from '@/components/SpacesImage'
import styles from '@/styles/client.module.css'

export default function Client({ client }: { client: ClientDto }) {
    return (
        <>
            <SpacesImg
                className={`${styles.clientImg} ${styles.lightClientImg}`}
                imgClassName="object-contain"
                src={`static/companies/${client.lightLogoUrl}`}
                alt={client.name}
            />

            <SpacesImg
                className={`${styles.clientImg} ${styles.darkClientImg}`}
                imgClassName="object-contain"
                src={`static/companies/${client.darkLogoUrl}`}
                alt={client.name}
            />
        </>
    )
}
