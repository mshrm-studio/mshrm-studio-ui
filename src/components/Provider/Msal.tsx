'use client'

import { msalConfig } from '@/utils/msal/Auth'
import { EventType, PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'

export const msalInstance = new PublicClientApplication(msalConfig)

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

export default function AuthContextProvider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <MsalProvider instance={msalInstance}>{children}</MsalProvider>
}
