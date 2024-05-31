'use client'

import AuthContext from '@/utils/context/Auth'
import { AccountInfo } from '@azure/msal-browser'
import { useState } from 'react'

export default function AuthContextProvider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [bearerToken, setBearerToken] = useState<string | null>(null)
    const [user, setUser] = useState<AccountInfo | null>(null)

    return (
        <AuthContext.Provider
            value={{ bearerToken, setBearerToken, user, setUser }}
        >
            {children}
        </AuthContext.Provider>
    )
}
