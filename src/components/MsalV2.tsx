'use client'

import {
    AccountInfo,
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
        async function initMsal(msalClientId: string) {
            const msalConfig = {
                auth: {
                    clientId: msalClientId,
                },
            }

            const msalInstance = new PublicClientApplication(msalConfig)

            await msalInstance.initialize()

            msalInstance
                .handleRedirectPromise()
                .then((response: AuthenticationResult | null) => {
                    if (response !== null) {
                        setAuthResult(response)
                    } else {
                        const accounts: AccountInfo[] =
                            msalInstance.getAllAccounts()

                        if (accounts.length > 0) {
                            if (accounts.length === 1) {
                                acquireTokenSilent(
                                    msalInstance,
                                    msalClientId,
                                    accounts[0].homeAccountId
                                )
                            } else {
                                acquireTokenSilent(
                                    msalInstance,
                                    msalClientId,
                                    accounts[0].homeAccountId
                                )
                            }
                        } else {
                            ssoSilent(msalInstance, msalClientId)
                        }
                    }
                })
                .catch((error) => {
                    setAuthError(error)
                })
        }

        const msalClientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID

        if (typeof msalClientId === 'string') initMsal(msalClientId)
    }, [])

    function acquireTokenSilent(
        msalInstance: PublicClientApplication,
        msalClientId: string,
        homeAccountId: string
    ) {
        // TODO
        // User interaction required?
        // No - tokens returned
        // Yes - acquireTokenRedirect

        const accountFilter = {
            homeAccountId: homeAccountId,
        }

        const request: SilentRequest = {
            account: msalInstance.getAccount(accountFilter) || undefined,
            scopes: [
                'profile',
                'email',
                'offline_access',
                `api://${msalClientId}/mshrm.studio`,
            ],
        }

        msalInstance
            .acquireTokenSilent(request)
            .then((authenticationResult: AuthenticationResult) => {
                // Do something with the tokenResponse
                setAuthResult(authenticationResult)
            })
            .catch((error) => {
                if (error instanceof InteractionRequiredAuthError) {
                    // fallback to interaction when silent call fails
                    msalInstance.acquireTokenRedirect(request)
                } else {
                    // handle other errors
                    setAuthError(error)
                }
            })
    }

    function ssoSilent(
        msalInstance: PublicClientApplication,
        msalClientId: string
    ) {
        // TODO
        // User interaction required?
        // No - tokens returned
        // Yes - acquireTokenRedirect

        const request = {
            scopes: [
                'profile',
                'email',
                'offline_access',
                `api://${msalClientId}/mshrm.studio`,
            ],
        }

        msalInstance
            .ssoSilent(request)
            .then((authenticationResult: AuthenticationResult) => {
                setAuthResult(authenticationResult)
            })
            .catch((error) => {
                if (error instanceof InteractionRequiredAuthError) {
                    // fallback to interaction when silent call fails
                    msalInstance.loginRedirect(request)
                } else {
                    // handle other errors
                    setAuthError(error)
                }
            })
    }

    return (
        <>
            <p>Access Token: {authResult ? authResult.accessToken : 'None'}</p>

            <div>
                Authentication Result:{' '}
                {authResult ? (
                    <pre>{JSON.stringify(authResult, null, 4)}</pre>
                ) : (
                    'None'
                )}
            </div>

            <div>
                Authentication Error:{' '}
                {authError ? (
                    <pre>{JSON.stringify(authError, null, 4)}</pre>
                ) : (
                    'None'
                )}
            </div>
        </>
    )
}
