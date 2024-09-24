'use client'

import UserContext from '@/utils/context/User'
import User, { isUserResponse } from '@/utils/dto/User'
import useAxios from '@/utils/hooks/useAxios'
import { useAccount } from '@azure/msal-react'
import { useEffect, useState } from 'react'

export default function UserContextProvider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [user, setUser] = useState<User | null>(null)
    const accountInfo = useAccount()
    const axios = useAxios()

    useEffect(() => {
        if (accountInfo && user === null) {
            axios.get(`/api/v1/users/profile`).then((response) => {
                console.log('/api/v1/users/profile response:', response)
                if (isUserResponse(response)) {
                    setUser(response.data)
                }
            })
        }
    }, [accountInfo, user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
