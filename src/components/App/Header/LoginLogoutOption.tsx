'use client'

import Link from '@/components/LocaleLink'
import { Dictionary } from '@/app/[lang]/dictionaries'
import { useIsAuthenticated } from '@azure/msal-react'
import useLogout from '@/utils/hooks/useMsalLogout'

export default function HeaderLoginLogoutOption({
    dict,
}: {
    dict: Dictionary
}) {
    const isAuthenticated = useIsAuthenticated()
    const logout = useLogout()

    return (
        <>
            {isAuthenticated ? (
                <button
                    aria-label={dict.header.ssoSignOut}
                    title={dict.header.ssoSignOut}
                    onClick={logout}
                >
                    {dict.header.ssoSignOut}
                </button>
            ) : (
                <Link href="/auth/sso">{dict.header.ssoSignIn}</Link>
            )}
        </>
    )
}
