import { PricingProviderType } from '@/utils/enums/PricingProviderType'
import { AssetType } from '@/utils/enums/AssetType'

export default interface Asset {
    guidId: string
    name: string | null
    symbol: string | null
    symbolNative: string | null
    description: string | null
    active: boolean
    providerType: PricingProviderType
    assetType: AssetType
    createdDate: string
    logoUrl: string | null
    logoGuidId: string | null
    decimalPlaces: number
}
