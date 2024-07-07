'use client'

import Link from '@/components/LocaleLink'
import { Dictionary } from '@/app/[lang]/dictionaries'
import { useIsAuthenticated } from '@azure/msal-react'
import useLogout from '@/utils/hooks/useMsalLogout'

export default function HeaderLoginLogoutOption({
    dictionary,
}: {
    dictionary: Dictionary
}) {
    const isAuthenticated = useIsAuthenticated()
    const logout = useLogout()

    return (
        <>
            {isAuthenticated ? (
                <button onClick={logout}>{dictionary.signOut}</button>
            ) : (
                <Link href="/auth/sso">{dictionary.signInWithMicrosoft}</Link>
            )}
        </>
    )
}
