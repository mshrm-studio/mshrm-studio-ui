import MarketEntity from '@/app/[lang]/(app)/_components/MarketEntity/MarketEntity'
import { Dictionary } from '@/app/[lang]/dictionaries'
import Asset from '@/utils/dto/Asset'

interface Props {
    assets: Asset[]
    currency: string
    dict: Dictionary
}

export default function MarketEntityList({ assets, currency, dict }: Props) {
    return (
        <ul className="p-6 flex space-x-6 overflow-y-hidden overflow-x-auto w-full xl:py-12 xl:overflow-x-hidden xl:grid xl:grid-cols-5 xl:space-x-0 xl:gap-x-6">
            {assets.map((asset) => (
                <li key={asset.guidId}>
                    <MarketEntity
                        asset={asset}
                        currency={currency}
                        dict={dict}
                    />
                </li>
            ))}
        </ul>
    )
}
