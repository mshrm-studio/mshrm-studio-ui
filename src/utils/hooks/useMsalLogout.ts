// useLogout.js
import { useCallback, useContext } from 'react'
import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import UserContext from '@/utils/context/User'

const useLogout = () => {
    const { instance } = useMsal()
    const authenticated = useIsAuthenticated()
    const { setUser } = useContext(UserContext)

    const logout = useCallback(() => {
        console.log('******************')
        console.log('logout')

        console.log('authenticated', authenticated)

        if (!authenticated) return null

        instance
            .logoutRedirect({
                onRedirectNavigate: (url) => {
                    console.log('onRedirectNavigate, url:', url)
                    // Return false if you would like to stop navigation after local logout
                    return false
                },
            })
            .then((response) => {
                console.log('response', response)
                setUser(null)
            })
            .catch(console.error)
    }, [authenticated, instance, setUser])

    return logout
}

export default useLogout
