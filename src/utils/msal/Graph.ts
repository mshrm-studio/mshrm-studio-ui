import { loginRequest, graphConfig } from '@/utils/msal/Auth'
import { msalInstance } from '@/components/Provider/Msal'

export async function callMsGraph() {
    const account = msalInstance.getActiveAccount()

    if (!account) {
        throw Error(
            'No active account! Verify a user has been signed in and setActiveAccount has been called.'
        )
    }

    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
    })

    const bearer = `Bearer ${response.accessToken}`

    const headers = new Headers()
    headers.append('Authorization', bearer)

    const options = {
        method: 'GET',
        headers: headers,
    }

    return fetch(graphConfig.graphMeEndpoint, options)
        .then((response) => response.json())
        .catch(console.error)
}
