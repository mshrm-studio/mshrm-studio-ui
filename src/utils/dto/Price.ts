import Asset from '@/utils/dto/Asset'

export default interface Price {
    price: number
    marketCap: number | null
    volume: number | null
    baseAsset: Asset
    asset: Asset
    createdDate: string
    updatedDate: string | null
}
