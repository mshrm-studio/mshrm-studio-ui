import ClientDto from '@/utils/dto/Client'
import SpacesImg from '@/components/SpacesImage'
import styles from '@/styles/client.module.css'

export default function Client({ client }: { client: ClientDto }) {
    const sizes = '(max-width: 768px) 100px, (max-width: 1024px) 150px, 210px'

    return (
        <>
            <SpacesImg
                className={`${styles.clientImg} ${styles.lightClientImg}`}
                imgClassName="object-contain"
                src={`static/companies/${client.lightLogoUrl}`}
                alt={`TODO (translate): dark ${client.name} logo`}
                sizes={sizes}
            />

            <SpacesImg
                className={`${styles.clientImg} ${styles.darkClientImg}`}
                imgClassName="object-contain"
                src={`static/companies/${client.darkLogoUrl}`}
                alt={`TODO (translate): light ${client.name} logo`}
                sizes={sizes}
            />
        </>
    )
}
