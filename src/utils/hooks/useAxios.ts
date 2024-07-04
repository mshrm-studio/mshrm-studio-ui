// src/hooks/useAxios.js
import { useMemo } from 'react'
import axios from 'axios'
import getAccessToken from '@/utils/msal/AccessToken'

const useAxios = () => {
    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
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
