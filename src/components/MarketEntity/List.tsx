import MarketEntityDto from '@/utils/dto/MarketEntity'
import MarketEntity from '@/components/MarketEntity/MarketEntity'

export default function MarketEntityList({
    marketEntities,
}: {
    marketEntities: MarketEntityDto[]
}) {
    return (
        <ul className="flex space-x-3">
            {marketEntities.map((marketEntity, i) => (
                <li key={i}>
                    <MarketEntity marketEntity={marketEntity} />
                </li>
            ))}
        </ul>
    )
}
