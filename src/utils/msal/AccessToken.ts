import { loginRequest } from '@/utils/msal/Auth'
import { msalInstance } from '@/components/Provider/Msal'

const getAccessToken = async () => {
    const storedToken = localStorage.getItem('accessToken')
    const storedTokenExpiry = localStorage.getItem('accessTokenExpiry')

    if (storedToken && storedTokenExpiry) {
        const expiryTime = new Date(storedTokenExpiry)

        // If the token is still valid, return it
        if (expiryTime > new Date()) {
            return storedToken
        }
    }

    const account = msalInstance.getActiveAccount()

    if (!account) return null

    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
    })

    localStorage.setItem('accessToken', response.accessToken)
    if (response.expiresOn) {
        localStorage.setItem('accessTokenExpiry', response.expiresOn.toString())
    }

    return response.accessToken
}

export default getAccessToken
