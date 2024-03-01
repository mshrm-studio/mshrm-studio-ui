import {
    AuthenticationResult,
    Configuration,
    InteractionRequiredAuthError,
    PublicClientApplication,
    SilentRequest,
} from '@azure/msal-browser'
import { useEffect, useState } from 'react'

export default function Page() {
    const [msalInstance, setMsalInstance] = useState<PublicClientApplication>()
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

            const instance = new PublicClientApplication(msalConfig)
            await instance.initialize()
            setMsalInstance(instance)

            instance
                .handleRedirectPromise()
                .then((authenticationResult) => {
                    if (!authenticationResult) {
                        loginRedirect()
                    } else {
                        setAuthResult(authenticationResult)
                    }
                })
                .catch((err) => {
                    if (err instanceof InteractionRequiredAuthError) {
                        loginRedirect()
                    } else {
                        setAuthError(err)
                    }
                })
        }

        initMsal()
    }, [])

    const loginRedirect = () => {
        if (!msalInstance) return

        const accounts = msalInstance.getAllAccounts()
        const oauthClientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID as string
        const scopes = [
            'profile',
            'email',
            'offline_access',
            `api://${oauthClientId}/mshrm.studio`,
        ]

        if (accounts.length > 0) {
            const silentRequest: SilentRequest = {
                scopes,
                account: accounts[0],
            }

            msalInstance
                .acquireTokenSilent(silentRequest)
                .then((authenticationResult) => {
                    setAuthResult(authenticationResult)
                })
                .catch((_error) => {
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
