import { loginRequest } from '@/utils/msal/Auth'
import { msalInstance } from '@/components/Provider/Msal'

export async function getProfile() {
    console.log('******************')
    console.log('getProfile')

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

    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/aggregator/api/v1/users`

    console.log('endpoint', endpoint)

    const bearer = `Bearer ${response.accessToken}`
    console.log('bearer', bearer)

    const headers = new Headers()
    headers.append('Authorization', bearer)

    const options = {
        method: 'GET',
        headers: headers,
    }

    console.log('options', options)

    return fetch(endpoint, options)
        .then((response) => response.json())
        .catch((error) => {
            console.log('error.response')
            console.log(error.response)
            console.log('error')
            console.log(error)
            console.log('error.message')
            console.log(error.message)
        })
}
