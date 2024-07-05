'use client'

import UserContext from '@/utils/context/User'
import User from '@/utils/dto/User'
import { useState } from 'react'

export default function UserContextProvider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [user, setUser] = useState<User | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
