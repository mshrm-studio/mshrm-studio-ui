import { PricingProviderType } from '@/utils/enums/PricingProviderType'
import { AssetType } from '@/utils/enums/AssetType'
import ApiPaginatedResponse, {
    isApiPaginatedResponse,
} from '@/utils/dto/ApiPaginatedResponse'

export default interface Asset {
    active: boolean
    assetType: AssetType
    createdDate: string
    decimalPlaces: number
    description: string | null
    logoUrl: string | null
    logoGuidId: string | null
    name: string | null
    guidId: string
    providerType: PricingProviderType
    symbolNative: string | null
    symbol: string | null
}

export interface AssetListResponse
    extends Omit<ApiPaginatedResponse, 'results'> {
    results: Asset[]
}

export function isAsset(input: unknown): input is Asset {
    return typeof input === 'object' && input !== null && 'name' in input
}

export function isAssetList(input: unknown): input is Asset[] {
    return Array.isArray(input) && input.every((item) => isAsset(item))
}

export function isAssetListResponse(
    input: unknown
): input is AssetListResponse {
    return isApiPaginatedResponse(input) && isAssetList(input.results)
}
