'use client'

import AuthContext from '@/utils/context/Auth'
import {
    AccountInfo,
    AuthenticationResult,
    InteractionRequiredAuthError,
    PublicClientApplication,
    SilentRequest,
} from '@azure/msal-browser'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

export default function Msal() {
    const [authResult, setAuthResult] = useState<AuthenticationResult>()
    const [authError, setAuthError] = useState<any>()
    const { user, setUser } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        async function initMsal(msalClientId: string) {
            console.log('******************')
            console.log('initMsal')
            const msalConfig = {
                auth: {
                    clientId: msalClientId,
                },
            }
            console.log('msalConfig', msalConfig)

            const msalInstance = new PublicClientApplication(msalConfig)

            await msalInstance.initialize()

            msalInstance
                .handleRedirectPromise()
                .then((response: AuthenticationResult | null) => {
                    console.log('response', response)

                    if (response !== null) {
                        setAuthResult(response)
                        setUser(response.account)
                        router.push('/')
                    } else {
                        const accounts: AccountInfo[] =
                            msalInstance.getAllAccounts()

                        console.log('accounts', accounts)

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
                    console.log('error', error)
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
        console.log('******************')
        console.log('acquireTokenSilent')

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

        console.log('request', request)

        msalInstance
            .acquireTokenSilent(request)
            .then((authenticationResult: AuthenticationResult) => {
                console.log('authenticationResult', authenticationResult)
                // Do something with the tokenResponse
                setAuthResult(authenticationResult)
                setUser(authenticationResult.account)
                router.push('/')
            })
            .catch((error) => {
                console.log('error', error)
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
        console.log('******************')
        console.log('ssoSilent')
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
                console.log('authenticationResult', authenticationResult)
                setAuthResult(authenticationResult)
            })
            .catch((error) => {
                console.log('error', error)
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
