import useAxios from '@/utils/hooks/useAxios'
import { isTool } from '@/utils/dto/Tool'
import { useCallback, useMemo, useState } from 'react'
import { AxiosError } from 'axios'

const useFetch = () => {
    const axios = useAxios()
    const [error, setError] = useState<AxiosError>()
    const [fetching, setFetching] = useState(false)
    const [response, setResponse] = useState<any>()

    const fetchData = useCallback(
        (endpoint: string) => {
            if (fetching) return // Prevent fetch if already fetching

            setError(undefined) // Reset error state before a new fetch

            setFetching(true)

            axios
                .get(endpoint)
                .then(setResponse)
                .catch(setError)
                .finally(() => setFetching(false))
        },
        [axios, fetching]
    )

    return { error, fetchData, fetching, response }
}

export default useFetch
