import MarketEntityDto from '@/utils/dto/MarketEntity'
import MarketEntity from '@/components/MarketEntity/MarketEntity'

export default function MarketEntityList({
    marketEntities,
}: {
    marketEntities: MarketEntityDto[]
}) {
    return (
        <ul className="p-6 flex space-x-6 overflow-x-auto w-full">
            {/* Y-padding for shadow */}
            {marketEntities.map((marketEntity, i) => (
                <li key={i}>
                    <MarketEntity marketEntity={marketEntity} />
                </li>
            ))}
        </ul>
    )
}
