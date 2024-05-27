import MarketEntityDto from '@/utils/dto/MarketEntity'
import MarketEntity from '@/components/MarketEntity/MarketEntity'

export default function MarketEntityList({
    marketEntities,
}: {
    marketEntities: MarketEntityDto[]
}) {
    return (
        <ul className="px-6 py-12 flex space-x-6 overflow-y-hidden overflow-x-auto w-full lg:overflow-x-hidden">
            {/* Y-padding for shadow */}
            {marketEntities.map((marketEntity, i) => (
                <li key={i}>
                    <MarketEntity marketEntity={marketEntity} />
                </li>
            ))}
        </ul>
    )
}
