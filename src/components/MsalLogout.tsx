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

export default function MsalLogout() {
    async function handleLogout() {
        console.log('******************')
        console.log('handleLogout')

        const msalClientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID

        if (typeof msalClientId !== 'string') return

        const msalConfig = {
            auth: {
                clientId: msalClientId,
                redirectUri: `${window.location.protocol}//${window.location.host}`,
                postLogoutRedirectUri: `${window.location.protocol}//${window.location.host}`,
            },
        }

        console.log('msalConfig', msalConfig)

        const msalInstance = new PublicClientApplication(msalConfig)

        await msalInstance.initialize()

        msalInstance
            .logoutRedirect({
                onRedirectNavigate: (url) => {
                    console.log('onRedirectNavigate, url:', url)
                    // Return false if you would like to stop navigation after local logout
                    return false
                },
            })
            .then((response) => {
                console.log('response', response)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    return <button onClick={handleLogout}>logout</button>
}
