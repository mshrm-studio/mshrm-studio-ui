'use client'

import { useContext, useEffect, useState } from 'react'
import {
    InteractionStatus,
    InteractionRequiredAuthError,
    InteractionType,
} from '@azure/msal-browser'
import { useMsal, useMsalAuthentication } from '@azure/msal-react'
import { loginRequest } from '@/utils/msal/Auth'
import useAxios from '@/utils/hooks/useAxios'
import { AxiosError } from 'axios'
import ApiError, { isApiError } from '@/utils/dto/ApiError'
import UserContext from '@/utils/context/User'
import DestructiveAlert from '@/components/Admin/DestructiveAlert'
import LoadingScreen from '@/components/LoadingScreen'
import useProcessingStatus from '@/utils/hooks/useProcessingStatus'
import { ProcessingStatus } from '@/utils/enums/ProcessingStatus'
import { useRouter } from 'next/navigation'
import { isUser } from '@/utils/dto/User'

export default function MsalLogin() {
    const { instance, accounts, inProgress } = useMsal()
    const { user, setUser } = useContext(UserContext)
    const [apiError, setApiError] = useState<ApiError>()
    const [unknownError, setUnknownError] = useState<any>()
    const { login, result, error } = useMsalAuthentication(
        InteractionType.Silent,
        loginRequest
    )
    const axios = useAxios()
    const { setStatus, status } = useProcessingStatus()
    const router = useRouter()

    function redirectUser() {
        const intended = localStorage.getItem('intended')

        router.push(intended || '/')
    }

    function createUser() {
        axios
            .post(`/api/v1/users`)
            .then((response) => {
                console.log('/api/v1/users response:', response)
                if (isUser(response?.data)) {
                    setUser(response.data)

                    redirectUser()
                } else {
                    setUnknownError(
                        `TODO (translate): System Error. Please try again or contact administrators on ${process.env.NEXT_PUBLIC_CONTACT_EMAIL}if problem persists. We apologise for the inconvenience.`
                    )

                    setStatus(ProcessingStatus.Error)
                }
            })
            .catch((error: AxiosError) => {
                console.log('/api/v1/users error:', error)

                if (isApiError(error.response?.data)) {
                    setApiError(error.response?.data)
                } else {
                    setUnknownError(error)
                }

                setStatus(ProcessingStatus.Error)
            })
    }

    useEffect(() => {
        if (status === ProcessingStatus.Pending) return

        if (inProgress === InteractionStatus.None && accounts.length > 0) {
            console.log('accounts', accounts)

            console.log(
                'instance.getActiveAccount()',
                instance.getActiveAccount()
            )

            setStatus(ProcessingStatus.Pending)

            axios
                .get(`/api/v1/users/profile`)
                .then((response) => {
                    console.log('/api/v1/users/profile response:', response)
                    if (isUser(response?.data)) {
                        setUser(response.data)

                        redirectUser()
                    } else {
                        setUnknownError(
                            `TODO (translate): System Error. Please try again or contact administrators on ${process.env.NEXT_PUBLIC_CONTACT_EMAIL} if problem persists. We apologise for the inconvenience.`
                        )

                        setStatus(ProcessingStatus.Error)
                    }
                })
                .catch((error: AxiosError) => {
                    console.log('/api/v1/users/profile error:', error)
                    if (error.response?.status === 401) {
                        instance.acquireTokenRedirect({
                            ...loginRequest,
                            account: instance.getActiveAccount() || undefined,
                        })
                    } else if (error.response?.status === 404) {
                        createUser()
                    } else {
                        if (isApiError(error.response?.data)) {
                            setApiError(error.response?.data)
                        } else {
                            setUnknownError(error)
                        }

                        setStatus(ProcessingStatus.Error)
                    }
                })
        }
    }, [inProgress, accounts, instance])

    useEffect(() => {
        if (error instanceof InteractionRequiredAuthError) {
            login(InteractionType.Redirect, loginRequest)
        }
    }, [error])

    if (apiError) {
        return (
            <DestructiveAlert>
                {Object.entries(apiError).map(([key, value]) => (
                    <p key={key}>
                        {key}: {value}
                    </p>
                ))}
            </DestructiveAlert>
        )
    }

    if (unknownError) {
        return (
            <DestructiveAlert>
                <div>{JSON.stringify(unknownError)}</div>
            </DestructiveAlert>
        )
    }

    return <LoadingScreen />
}
