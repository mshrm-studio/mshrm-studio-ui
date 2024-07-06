export default interface ApiPaginatedResponse {
    pageNumber: number
    perPage: number
    results: any[]
    totalResults: number
}

export function isApiPaginatedResponse(
    response: unknown
): response is ApiPaginatedResponse {
    return (
        typeof response === 'object' &&
        response !== null &&
        'pageNumber' in response &&
        typeof response.pageNumber === 'number' &&
        'perPage' in response &&
        typeof response.perPage === 'number' &&
        'results' in response &&
        Array.isArray(response.results) &&
        'totalResults' in response &&
        typeof response.totalResults === 'number'
    )
}
