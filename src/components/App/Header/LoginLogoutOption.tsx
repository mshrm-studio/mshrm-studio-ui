'use client'

import MsalLogout from '@/components/MsalLogout'
import Link from '@/components/LocaleLink'
import { Dictionary } from '@/app/[lang]/dictionaries'
import { useIsAuthenticated } from '@azure/msal-react'

export default function HeaderLoginLogoutOption({
    dictionary,
}: {
    dictionary: Dictionary
}) {
    const isAuthenticated = useIsAuthenticated()

    return (
        <>
            {isAuthenticated ? (
                <MsalLogout>{dictionary.signOut}</MsalLogout>
            ) : (
                <Link href="/auth/sso">{dictionary.signInWithMicrosoft}</Link>
            )}
        </>
    )
}
