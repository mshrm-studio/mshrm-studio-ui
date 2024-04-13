'use client'

import AuthContext from '@/utils/context/Auth'
import { useContext } from 'react'
import MsalLogout from '@/components/MsalLogout'
import Link from '@/components/LocaleLink'
import { Dictionary } from '@/app/[lang]/dictionaries'

export default function HeaderLoginLogoutOption({
    dictionary,
}: {
    dictionary: Dictionary
}) {
    const { user } = useContext(AuthContext)

    return (
        <>
            {user ? (
                <MsalLogout>{dictionary.signOut}</MsalLogout>
            ) : (
                <Link href="/auth/sso">{dictionary.signInWithMicrosoft}</Link>
            )}
        </>
    )
}
