import {
    AuthenticationResult,
    Configuration,
    InteractionRequiredAuthError,
    PublicClientApplication,
    SilentRequest,
} from '@azure/msal-browser'
import { useEffect, useState } from 'react'

export default function Page() {
    const [authResult, setAuthResult] = useState<AuthenticationResult>()
    const [authError, setAuthError] = useState<any>()

    useEffect(() => {
        const initMsal = async () => {
            const msalConfig: Configuration = {
                auth: {
                    clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID as string,
                    redirectUri: process.env
                        .NEXT_PUBLIC_OAUTH_REDIRECT_URI as string,
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

                    if (err instanceof InteractionRequiredAuthError) {
                        loginRedirect(msalInstance)
                    } else {
                        setAuthError(err)
                    }
                })
        }

        initMsal()
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
            <h1>Hello, SSO Page!</h1>

            <p>Access Token: {authResult ? authResult.accessToken : 'None'}</p>

            <p>
                Authentication Result:{' '}
                {authResult ? JSON.stringify(authResult) : 'None'}
            </p>

            <p>
                Authentication Error:{' '}
                {authError ? JSON.stringify(authError) : 'None'}
            </p>
        </>
    )
}
