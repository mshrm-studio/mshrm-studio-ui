'use client'

import { useContext, useEffect, useState } from 'react'
import {
    InteractionStatus,
    InteractionRequiredAuthError,
    InteractionType,
} from '@azure/msal-browser'
import { useMsal, useMsalAuthentication } from '@azure/msal-react'
import { loginRequest } from '@/utils/msal/Auth'
import CopyToClipboard from '@/components/Admin/CopyToClipboard'
import useAxios from '@/utils/hooks/useAxios'
import { AxiosError } from 'axios'
import { isUser } from '@/utils/dto/User'
import ApiError, { isApiError } from '@/utils/dto/ApiError'
import UserContext from '@/utils/context/User'
import DestructiveAlert from '@/components/Admin/DestructiveAlert'
import Link from 'next/link'
import { HomeIcon } from 'lucide-react'

export default function Msal() {
    const { instance, accounts, inProgress } = useMsal()
    const { user, setUser } = useContext(UserContext)
    const [apiError, setApiError] = useState<ApiError>()
    const { login, result, error } = useMsalAuthentication(
        InteractionType.Silent,
        loginRequest
    )
    const axios = useAxios()

    function createUser() {
        axios
            .post(`/auth/api/v1/user/sso`)
            .then((response) => {
                console.log('createUser response')
                console.log(response)

                if (isUser(response.data)) {
                    setUser(response.data)

                    // TODO: navigate
                } else {
                    // TODO: handle error
                }
            })
            .catch((error: AxiosError) => {
                // TODO: handle error
                console.log('createUser error.response')
                console.log(error.response)

                if (isApiError(error.response?.data)) {
                    setApiError(error.response?.data)
                } else {
                    // TODO: handle other errors
                }
            })
    }

    useEffect(() => {
        if (inProgress === InteractionStatus.None && accounts.length > 0) {
            axios
                .get(`/aggregator/api/v1/users`)
                .then((response) => {
                    console.log('/aggregator/api/v1/users response')
                    console.log(response)

                    if (isUser(response.data)) {
                        setUser(response.data)

                        // TODO: navigate, add user to context.
                    } else {
                        // TODO: handle unexpected response
                    }
                })
                .catch((error: AxiosError) => {
                    console.log('/aggregator/api/v1/users error.response')

                    console.log(error.response)

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
                        // TODO: handle other errors
                    }
                })
        }
    }, [inProgress, accounts, instance])

    useEffect(() => {
        if (error instanceof InteractionRequiredAuthError) {
            login(InteractionType.Redirect, loginRequest)
        }
    }, [error])

    return (
        <div className="space-y-8">
            {result && result.accessToken && (
                <CopyToClipboard content={result.accessToken}>
                    Copy Access Token
                </CopyToClipboard>
            )}

            {apiError && (
                <DestructiveAlert>
                    {Object.entries(apiError).map(([key, value]) => (
                        <p>
                            {key}: {value}
                        </p>
                    ))}
                </DestructiveAlert>
            )}

            {user && (
                <div className="space-y-4">
                    <h1 className="text-lg">User</h1>

                    <pre>{JSON.stringify(user, null, 4)}</pre>

                    <Link href="/">
                        <HomeIcon /> go home
                    </Link>
                </div>
            )}
        </div>
    )
}
