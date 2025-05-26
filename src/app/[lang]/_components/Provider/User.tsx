'use client'

import UserContext from '@/utils/context/User'
import User, { isUser } from '@/utils/dto/User'
import { profileFetcher } from '@/utils/repo/profileFetcher'
import { useAccount } from '@azure/msal-react'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function UserContextProvider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [user, setUser] = useState<User | null>(null)
    const accountInfo = useAccount()

    const { data } = useSWR(accountInfo, profileFetcher)

    useEffect(() => {
        if (isUser(data)) {
            setUser(data)
        }
    }, [data])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
