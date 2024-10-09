import { Dictionary } from '@/app/[lang]/dictionaries'
import ClientList from '@/components/App/Client/List'
import clients from '@/utils/content/clients'

export default function HomePageClients({ dict }: { dict: Dictionary }) {
    return (
        <section className="mb-6 md:mb-12">
            <div className="px-6 mb-6 md:mb-12 xl:max-w-site xl:mx-auto">
                <h2 className="font-bold">{dict.home.weHaveWorkedWith}</h2>
            </div>

            <ClientList
                clients={clients.map((client) => ({
                    ...client,
                    guid: `static/clients/${client.logoPrefix}`,
                    darkLogoGuid: `static/clients/${client.logoPrefix}-dark.png`,
                    darkLogoUrl: `static/clients/${client.logoPrefix}-dark.png`,
                    lightLogoGuid: `static/clients/${client.logoPrefix}-light.png`,
                    lightLogoUrl: `static/clients/${client.logoPrefix}-light.png`,
                    link: null,
                }))}
                dict={dict}
            />
        </section>
    )
}
