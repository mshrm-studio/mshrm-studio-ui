'use client'

import {
    PublicClientApplication,
    InteractionStatus,
    InteractionRequiredAuthError,
    EventType,
    InteractionType,
} from '@azure/msal-browser'
import { useEffect } from 'react'
import {
    useIsAuthenticated,
    useMsal,
    useMsalAuthentication,
} from '@azure/msal-react'

export default function Msal() {
    const { instance, accounts, inProgress } = useMsal()
    const isAuthenticated = useIsAuthenticated()
    const { login, result, error } = useMsalAuthentication(
        InteractionType.Silent,
        {
            scopes: [
                'profile',
                'email',
                'offline_access',
                `api://${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}/mshrm.studio`,
            ],
        }
    )

    useEffect(() => {
        function initMsal(msalClientId: string) {
            console.log('******************')
            console.log('initMsal')

            const msalConfig = {
                auth: {
                    clientId: msalClientId,
                },
            }

            console.log('msalConfig', msalConfig)

            const msalInstance = new PublicClientApplication(msalConfig)

            msalInstance.initialize().then(() => {
                // Account selection logic is app dependent. Adjust as needed for different use cases.
                const accounts = msalInstance.getAllAccounts()

                if (accounts.length > 0) {
                    msalInstance.setActiveAccount(accounts[0])
                }

                msalInstance.addEventCallback((event) => {
                    if (
                        event.eventType === EventType.LOGIN_SUCCESS &&
                        event.payload &&
                        'account' in event.payload &&
                        event.payload.account
                    ) {
                        msalInstance.setActiveAccount(event.payload.account)
                    }
                })
            })
        }

        const msalClientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID

        if (typeof msalClientId === 'string') initMsal(msalClientId)
    }, [])

    useEffect(() => {
        console.log('******************')
        console.log('useEffect')
        console.log('inProgress', inProgress)
        console.log('accounts', accounts)

        if (inProgress === InteractionStatus.None && accounts.length > 0) {
            console.log('******************')
            console.log('acquireTokenSilent')

            const tokenRequest = {
                account: accounts[0], // This is an example - Select account based on your app's requirements
                scopes: [
                    'profile',
                    'email',
                    'offline_access',
                    `api://${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}/mshrm.studio`,
                ],
            }

            instance
                .acquireTokenSilent(tokenRequest)
                .then((response) => {
                    console.log('response')
                    console.log(response)
                })
                .catch(async (error) => {
                    console.log('error')
                    console.log(error)
                    // Catch interaction_required errors and call interactive method to resolve
                    if (error instanceof InteractionRequiredAuthError) {
                        await instance.acquireTokenRedirect(tokenRequest)
                    }

                    throw error
                })
        } else if (
            inProgress === InteractionStatus.None &&
            accounts.length === 0
        ) {
            login()
        }
    }, [inProgress, isAuthenticated, accounts, instance])

    return <div>{JSON.stringify(accounts)}</div>
}
