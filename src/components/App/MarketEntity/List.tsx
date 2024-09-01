import MarketEntityDto from '@/utils/dto/MarketEntity'
import MarketEntity from '@/components/App/MarketEntity/MarketEntity'
import { Dictionary } from '@/app/[lang]/dictionaries'

export default function MarketEntityList({
    dict,
    marketEntities,
}: {
    dict: Dictionary
    marketEntities: MarketEntityDto[]
}) {
    return (
        <ul className="p-6 flex space-x-6 overflow-y-hidden overflow-x-auto w-full xl:py-12 xl:overflow-x-hidden xl:grid xl:grid-cols-5 xl:space-x-0 xl:gap-x-6">
            {marketEntities.map((marketEntity, i) => (
                <li key={i}>
                    <MarketEntity dict={dict} marketEntity={marketEntity} />
                </li>
            ))}
        </ul>
    )
}
