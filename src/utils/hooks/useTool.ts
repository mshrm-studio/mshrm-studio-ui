import { isTool } from '@/utils/dto/Tool'
import { useCallback, useMemo } from 'react'
import useFetch from '@/utils/hooks/useFetch'

const useTool = () => {
    const { error, fetching, fetchData, response } = useFetch()

    const fetchTool = useCallback(
        (guid: string) => {
            fetchData(`/aggregator/api/v1/tools/guid/${guid}`)
        },
        [fetchData]
    )

    const tool = useMemo(() => {
        const data = response?.data

        return isTool(data) ? data : undefined
    }, [response])

    return { error, fetching, fetchTool, tool }
}

export default useTool
