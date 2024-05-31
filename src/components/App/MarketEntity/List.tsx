import MarketEntityDto from '@/utils/dto/MarketEntity'
import MarketEntity from '@/components/App/MarketEntity/MarketEntity'

export default function MarketEntityList({
    marketEntities,
}: {
    marketEntities: MarketEntityDto[]
}) {
    return (
        <ul className="px-6 py-12 flex space-x-6 overflow-y-hidden overflow-x-auto w-full lg:overflow-x-hidden lg:grid lg:grid-cols-5 lg:space-x-0 lg:gap-x-6">
            {/* Y-padding for shadow */}
            {marketEntities.map((marketEntity, i) => (
                <li key={i}>
                    <MarketEntity marketEntity={marketEntity} />
                </li>
            ))}
        </ul>
    )
}
