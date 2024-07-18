import { useMemo } from 'react'
import axios from 'axios'
import getAccessToken from '@/utils/msal/AccessToken'

const useAxios = () => {
    const axiosInstance = useMemo(() => {
        const nonNormalisedApiUrl = process.env.NEXT_PUBLIC_API_URL as string

        const apiUrl = nonNormalisedApiUrl.endsWith('/')
            ? nonNormalisedApiUrl.slice(0, -1)
            : nonNormalisedApiUrl

        const instance = axios.create({
            baseURL: apiUrl,
        })

        // Add a request interceptor to include the bearer token in headers
        instance.interceptors.request.use(
            async (config) => {
                const token = await getAccessToken()

                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`
                }

                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        return instance
    }, [])

    return axiosInstance
}

export default useAxios
