// useMsalLogout.js
import { useCallback, useContext } from 'react'
import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import UserContext from '@/utils/context/User'

const useMsalLogout = () => {
    const { instance } = useMsal()
    const authenticated = useIsAuthenticated()
    const { setUser } = useContext(UserContext)

    const logout = useCallback(() => {
        if (!authenticated) return null

        instance
            .logoutRedirect({
                onRedirectNavigate: (_url) => {
                    // Return false if you would like to stop navigation after local logout
                    return false
                },
            })
            .then((_response) => {
                setUser(null)
            })
            .catch(console.error)
    }, [authenticated, instance, setUser])

    return logout
}

export default useMsalLogout
