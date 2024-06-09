import { loginRequest, graphConfig } from '@/utils/msal/Auth'
import { msalInstance } from '@/components/Provider/Msal'

export async function callMsGraph() {
    console.log('******************')
    console.log('callMsGraph')

    const account = msalInstance.getActiveAccount()
    console.log('account', account)

    if (!account) {
        throw Error(
            'No active account! Verify a user has been signed in and setActiveAccount has been called.'
        )
    }

    console.log('request', {
        ...loginRequest,
        account: account,
    })

    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
    })

    console.log('response', response)
    console.log('graphConfig.graphMeEndpoint', graphConfig.graphMeEndpoint)

    const bearer = `Bearer ${response.accessToken}`
    console.log('bearer', bearer)

    const headers = new Headers()
    headers.append('Authorization', bearer)

    const options = {
        method: 'GET',
        headers: headers,
    }

    console.log('options', options)

    return fetch(graphConfig.graphMeEndpoint, options)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}
