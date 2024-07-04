import { loginRequest } from '@/utils/msal/Auth'
import { msalInstance } from '@/components/Provider/Msal'
import axios from 'axios'
import getAccessToken from '@/utils/msal/AccessToken'

export async function getProfile() {
    const token = await getAccessToken()

    if (!token) {
        throw Error(
            'No active account! Verify a user has been signed in and setActiveAccount has been called.'
        )
    }

    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/aggregator/api/v1/users`

    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    console.log('options', options)

    return axios.get(endpoint, options)
}
