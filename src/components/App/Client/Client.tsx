import ClientDto from '@/utils/dto/Client'
import SpacesImg from '@/components/SpacesImage'
import { useTheme } from 'next-themes'
import { useMemo } from 'react'

export default function Client({ client }: { client: ClientDto }) {
    const { resolvedTheme } = useTheme()

    const logoUrl = useMemo(() => {
        const path =
            resolvedTheme === 'dark' ? client.darkLogoUrl : client.lightLogoUrl

        return `static/companies/${path}`
    }, [client, resolvedTheme])

    return (
        <SpacesImg
            className="min-h-[65px] min-w-[80px] max-h-[80px] max-w-[210px]"
            imgClassName="object-contain"
            src={logoUrl}
            alt={client.name}
        />
    )
}
