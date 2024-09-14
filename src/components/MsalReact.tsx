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
import { isUser } from '@/utils/dto/User'
import ApiError, { isApiError } from '@/utils/dto/ApiError'
import UserContext from '@/utils/context/User'
import DestructiveAlert from '@/components/Admin/DestructiveAlert'
import LoadingScreen from '@/components/LoadingScreen'

export default function Msal() {
    const { instance, accounts, inProgress } = useMsal()
    const { user, setUser } = useContext(UserContext)
    const [apiError, setApiError] = useState<ApiError>()
    const [unknownError, setUnknownError] = useState<any>()
    const { login, result, error } = useMsalAuthentication(
        InteractionType.Silent,
        loginRequest
    )
    const axios = useAxios()

    function createUser() {
        axios
            .post(`/api/v1/user/sso`)
            .then((response) => {
                console.log('/api/v1/user/sso response:', response)
                if (isUser(response.data)) {
                    setUser(response.data)

                    // TODO: navigate
                } else {
                    setUnknownError(
                        `TODO (translate): System Error. Please try again or contact administrators on ${process.env.NEXT_PUBLIC_CONTACT_EMAIL}if problem persists. We apologise for the inconvenience.`
                    )
                }
            })
            .catch((error: AxiosError) => {
                console.log('/api/v1/user/sso error:', error)
                if (isApiError(error.response?.data)) {
                    setApiError(error.response?.data)
                } else {
                    setUnknownError(error)
                }
            })
    }

    useEffect(() => {
        if (inProgress === InteractionStatus.None && accounts.length > 0) {
            axios
                .get(`/api/v1/users`)
                .then((response) => {
                    console.log('/api/v1/users response:', response)
                    if (isUser(response.data)) {
                        setUser(response.data)

                        // TODO: navigate, add user to context.
                    } else {
                        setUnknownError(
                            `TODO (translate): System Error. Please try again or contact administrators on ${process.env.NEXT_PUBLIC_CONTACT_EMAIL}if problem persists. We apologise for the inconvenience.`
                        )
                    }
                })
                .catch((error: AxiosError) => {
                    console.log('/api/v1/users error:', error)
                    if (error.response?.status === 401) {
                        instance.acquireTokenRedirect({
                            ...loginRequest,
                            account: instance.getActiveAccount() || undefined,
                        })
                    } else if (error.response?.status === 404) {
                        createUser()
                    } else if (isApiError(error.response?.data)) {
                        setApiError(error.response?.data)
                    } else {
                        setUnknownError(error)
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
