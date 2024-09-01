'use client'

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/Admin/shadcnui/dropdown-menu'
import { Button } from '@/components/Admin/shadcnui/button'
import useDictionary from '@/utils/hooks/useDictionary'
import { User } from 'lucide-react'
import { useIsAuthenticated } from '@azure/msal-react'
import { useContext } from 'react'
import UserContext from '@/utils/context/User'
import useLogout from '@/utils/hooks/useMsalLogout'
import { useRouter } from 'next/navigation'

export default function AdminLayoutProfileMenu() {
    const dict = useDictionary()
    const { user } = useContext(UserContext)
    const authenticated = useIsAuthenticated()
    const logout = useLogout()
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    aria-label={`TODO (translate): Toggle user menu`}
                    title={`TODO (translate): Toggle user menu`}
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                >
                    <User />

                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {authenticated ? (
                    <>
                        {user && (
                            <>
                                <DropdownMenuLabel>
                                    {user.fullName || user.email}
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    TODO: Profile
                                </DropdownMenuItem>
                            </>
                        )}

                        <DropdownMenuItem onSelect={logout}>
                            {dict.action.signOut}
                        </DropdownMenuItem>
                    </>
                ) : (
                    <DropdownMenuItem onSelect={() => router.push('/auth/sso')}>
                        {dict.action.signIn}
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
