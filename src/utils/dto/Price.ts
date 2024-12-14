import Asset from '@/utils/dto/Asset'
import ApiPaginatedResponse, {
    isApiPaginatedResponse,
} from '@/utils/dto/ApiPaginatedResponse'

export default interface Price {
    price: number
    marketCap: number | null
    volume: number | null
    baseAsset: Asset
    asset: Asset
    createdDate: string
    updatedDate: string | null
}

export interface PriceListResponse
    extends Omit<ApiPaginatedResponse, 'results'> {
    results: Asset[]
}

export function isPrice(input: unknown): input is Price {
    return typeof input === 'object' && input !== null && 'price' in input
}

export function isPriceList(input: unknown): input is Price[] {
    return Array.isArray(input) && input.every((item) => isPrice(item))
}
