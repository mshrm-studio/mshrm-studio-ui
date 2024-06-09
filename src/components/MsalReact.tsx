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
import { callMsGraph } from '@/utils/msal/Graph'

export default function Msal() {
    const { instance, accounts, inProgress } = useMsal()
    const [graphData, setGraphData] = useState<any>()
    const { login, result, error } = useMsalAuthentication(
        InteractionType.Silent,
        loginRequest
    )

    useEffect(() => {
        if (inProgress === InteractionStatus.None && accounts.length > 0) {
            callMsGraph()
                .then((response) => setGraphData(response))
                .catch((e) => {
                    if (e instanceof InteractionRequiredAuthError) {
                        instance.acquireTokenRedirect({
                            ...loginRequest,
                            account: instance.getActiveAccount() as AccountInfo,
                        })
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

            {graphData && (
                <div className="space-y-4">
                    <h1 className="text-lg">Graph Data</h1>

                    <pre>{JSON.stringify(graphData, null, 4)}</pre>
                </div>
            )}
        </div>
    )
}
