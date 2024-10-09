export const msalConfig = {
    auth: {
        clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID as string,
    },
}

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
    scopes: [
        'profile',
        'email',
        'offline_access',
        `api://${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}/mshrm.studio`,
    ],
}
