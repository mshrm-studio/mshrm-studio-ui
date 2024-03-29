'use client'

import {
    AuthenticationResult,
    Configuration,
    InteractionRequiredAuthError,
    PublicClientApplication,
    SilentRequest,
} from '@azure/msal-browser'
import { useEffect, useState } from 'react'

export default function Msal() {
    const [authResult, setAuthResult] = useState<AuthenticationResult>()
    const [authError, setAuthError] = useState<any>()

    useEffect(() => {
        const initMsal = async () => {
            // Get the full URL
            const fullUrl = window.location.href

            // Get the protocol (e.g., "http:" or "https:")
            const protocol = window.location.protocol

            // Get the host (includes hostname and port if available)
            const host = window.location.host

            // Get the path of the URL
            const pathname = window.location.pathname

            // Get the query string (e.g., "?query=string")
            const search = window.location.search

            // Get the hash fragment (e.g., "#section")
            const hash = window.location.hash

            console.log('Full URL:', fullUrl)
            console.log('Protocol:', protocol)
            console.log('Host:', host)
            console.log('Pathname:', pathname)
            console.log('Search (Query Parameters):', search)
            console.log('Hash Fragment:', hash)

            const msalConfig: Configuration = {
                auth: {
                    clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID as string,
                },
            }

            console.log('***********')
            console.log('initMsal')
            console.log('msalConfig:', msalConfig)

            const msalInstance = new PublicClientApplication(msalConfig)
            await msalInstance.initialize()

            msalInstance
                .handleRedirectPromise()
                .then((authenticationResult) => {
                    console.log('***********')
                    console.log('msalInstance.handleRedirectPromise')
                    console.log('authenticationResult:', authenticationResult)

                    if (!authenticationResult) {
                        loginRedirect(msalInstance)
                    } else {
                        setAuthResult(authenticationResult)
                    }
                })
                .catch((err) => {
                    console.log('***********')
                    console.log('msalInstance.handleRedirectPromise')
                    console.log('err:', err)
                    console.log('err.response:', err?.response || 'None')

                    if (err instanceof InteractionRequiredAuthError) {
                        loginRedirect(msalInstance)
                    } else {
                        setAuthError(err)
                    }
                })
        }

        if (authError === undefined) initMsal()
    }, [])

    const loginRedirect = (msalInstance: PublicClientApplication) => {
        console.log('***********')
        console.log('loginRedirect')
        console.log('msalInstance', msalInstance)

        const accounts = msalInstance.getAllAccounts()
        const oauthClientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID as string
        const scopes = [
            'profile',
            'email',
            'offline_access',
            `api://${oauthClientId}/mshrm.studio`,
        ]

        console.log('accounts:', accounts)
        console.log('oauthClientId:', oauthClientId)
        console.log('scopes:', scopes)

        if (accounts.length > 0) {
            const silentRequest: SilentRequest = {
                scopes,
                account: accounts[0],
            }

            console.log('silentRequest:', silentRequest)

            msalInstance
                .acquireTokenSilent(silentRequest)
                .then((authenticationResult) => {
                    console.log('***********')
                    console.log('msalInstance.acquireTokenSilent')
                    console.log('authenticationResult:', authenticationResult)
                    setAuthResult(authenticationResult)
                })
                .catch((error) => {
                    console.log('***********')
                    console.log('msalInstance.acquireTokenSilent')
                    console.log('error:', error)
                    msalInstance.acquireTokenRedirect({ scopes })
                })
        } else {
            msalInstance.loginRedirect({ scopes })
        }
    }

    return (
        <>
            <p>Access Token: {authResult ? authResult.accessToken : 'None'}</p>

            <p>
                Authentication Result:{' '}
                {authResult ? (
                    <pre>{JSON.stringify(authResult, null, 4)}</pre>
                ) : (
                    'None'
                )}
            </p>

            <p>
                Authentication Error:{' '}
                {authError ? (
                    <pre>{JSON.stringify(authError, null, 4)}</pre>
                ) : (
                    'None'
                )}
            </p>
        </>
    )
}
