import { isToolListResponse } from '@/utils/dto/Tool'
import { useCallback, useMemo } from 'react'
import useFetch from '@/utils/hooks/useFetch'

const useTool = () => {
    const { error, fetching, fetchData, response } = useFetch()

    const fetchTools = useCallback(
        (params?: URLSearchParams) => {
            const endpoint = `/aggregator/api/v1/tools`

            fetchData(params ? `${endpoint}?${params.toString()}` : endpoint)
        },
        [fetchData]
    )

    const toolList = useMemo(() => {
        return isToolListResponse(response) ? response.data.results : undefined
    }, [response])

    return { error, fetching, fetchTools, toolList }
}

export default useTool
