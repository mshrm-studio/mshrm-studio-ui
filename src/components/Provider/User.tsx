'use client'

import UserContext from '@/utils/context/User'
import User from '@/utils/dto/User'
import useAxios from '@/utils/hooks/useAxios'
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
    const axios = useAxios()

    const { data } = useSWR([accountInfo, user], profileFetcher)

    useEffect(() => {
        setUser(data || null)
    }, [data])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
