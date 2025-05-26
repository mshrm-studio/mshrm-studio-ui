import ClientDto from '@/utils/dto/Client'
import Client from '@/app/[lang]/(app)/_components/Client/Client'
import Marquee from 'react-fast-marquee'
import { Dictionary } from '@/app/[lang]/dictionaries'

export default function ClientList({
    clients,
    dict,
}: {
    clients: ClientDto[]
    dict: Dictionary
}) {
    return (
        <Marquee>
            {clients.map((client) => (
                <div className="px-6">
                    <Client client={client} dict={dict} />
                </div>
            ))}
        </Marquee>
    )
}
