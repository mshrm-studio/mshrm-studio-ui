'use client'

import { useEffect, useState } from 'react'
import {
    InteractionStatus,
    InteractionRequiredAuthError,
    InteractionType,
    AccountInfo,
} from '@azure/msal-browser'
import { useMsal, useMsalAuthentication } from '@azure/msal-react'
import { loginRequest } from '@/utils/msal/Auth'
import CopyToClipboard from '@/components/Admin/CopyToClipboard'
import useAxios from '@/utils/hooks/useAxios'
import { AxiosError } from 'axios'

export default function Msal() {
    const { instance, accounts, inProgress } = useMsal()
    const [userResponse, setUserResponse] = useState<any>()
    const [userError, setUserError] = useState<any>()
    const { login, result, error } = useMsalAuthentication(
        InteractionType.Silent,
        loginRequest
    )
    const axios = useAxios()

    function createUser() {
        axios
            .post(`/auth/api/v1/user/sso`)
            .then(console.log)
            .catch(console.error)
    }

    useEffect(() => {
        if (inProgress === InteractionStatus.None && accounts.length > 0) {
            axios
                .get(`/aggregator/api/v1/users`)
                .then(console.log)
                .catch((error: AxiosError) => {
                    if (error.status === 401) {
                        instance.acquireTokenRedirect({
                            ...loginRequest,
                            account: instance.getActiveAccount() || undefined,
                        })
                    } else if (error.status === 404) {
                        createUser()
                    } else {
                        // todo: handle other errors
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

            {accounts && (
                <div className="space-y-4">
                    <h1 className="text-lg">Accounts</h1>

                    <pre>{JSON.stringify(accounts, null, 4)}</pre>
                </div>
            )}

            {result && (
                <div className="space-y-4">
                    <h1 className="text-lg">Result</h1>

                    <pre>{JSON.stringify(result, null, 4)}</pre>
                </div>
            )}

            {error && (
                <div className="space-y-4">
                    <h1 className="text-lg">Error</h1>

                    <pre>{JSON.stringify(error, null, 4)}</pre>
                </div>
            )}

            {userResponse && (
                <div className="space-y-4">
                    <h1 className="text-lg">User Response</h1>

                    <pre>{JSON.stringify(userResponse, null, 4)}</pre>
                </div>
            )}

            {userError && (
                <div className="space-y-4">
                    <h1 className="text-lg">User Error</h1>

                    <pre>{JSON.stringify(userError, null, 4)}</pre>
                </div>
            )}
        </div>
    )
}
