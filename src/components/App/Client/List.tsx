import ClientDto from '@/utils/dto/Client'
import Client from '@/components/App/Client/Client'
import Marquee from 'react-fast-marquee'

export default function ClientList({ clients }: { clients: ClientDto[] }) {
    return (
        <Marquee>
            {clients.map((client) => (
                <div className="px-6">
                    <Client client={client} />
                </div>
            ))}
        </Marquee>
    )
}
