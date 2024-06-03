import { CurrencyType } from '@/utils/enums/CurrencyType'
import { PricingProviderType } from '@/utils/enums/PricingProviderType'

export default interface Currency {
    guidId: string
    name: string | null
    symbol: string | null
    symbolNative: string | null
    description: string | null
    active: boolean
    providerType: PricingProviderType
    currencyType: CurrencyType
    createdDate: string
    logoUrl: string | null
    logoGuidId: string | null
}
