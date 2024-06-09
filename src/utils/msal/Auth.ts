export const msalConfig = {
    auth: {
        clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID as string,
    },
    // system: {
    //     allowNativeBroker: false, // Disables WAM Broker
    // },
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

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
}
