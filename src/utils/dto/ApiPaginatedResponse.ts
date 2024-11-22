export default interface ApiPaginatedResponse {
    pageNumber: number
    perPage: number
    results: any[]
    totalResults: number
}

export function isApiPaginatedResponse(
    input: unknown
): input is ApiPaginatedResponse {
    return (
        typeof input === 'object' &&
        input !== null &&
        'pageNumber' in input &&
        typeof input.pageNumber === 'number' &&
        'perPage' in input &&
        typeof input.perPage === 'number' &&
        'results' in input &&
        Array.isArray(input.results) &&
        'totalResults' in input &&
        typeof input.totalResults === 'number'
    )
}
