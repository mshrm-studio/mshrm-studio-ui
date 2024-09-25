import { NextRequest, NextResponse } from 'next/server'

export function cspMiddleware(request: NextRequest) {
    // todo: disabled as cannot get msal-react to work
    return

    // tried but stuff like WalletConnect just does not work
    // const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

    const cspHeaderObj = {
        'base-uri': ["'self'"],
        'connect-src': [
            "'self'",
            'https://api.web3modal.com',
            'https://pulse.walletconnect.com',
            'wss://relay.walletconnect.com',
            'wss://www.walletlink.org',
        ],
        'default-src': ["'self'"],
        'img-src': [
            "'self'",
            'blob:',
            'data:',
            'https://mshrmstudiostorage.blob.core.windows.net',
        ],
        'font-src': ["'self'", 'https://fonts.gstatic.com'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'frame-src': [
            "'self'",
            'https://verify.walletconnect.com',
            'https://login.microsoftonline.com',
            'https://login.live.com',
            'https://localhost:3000',
        ],
        'object-src': ["'none'"],
        'script-src-elem': ["'self'", "'unsafe-inline'"],
        'script-src': ["'self'", "'strict-dynamic'", "'unsafe-eval'"],
        'style-src': [
            "'self'",
            "'unsafe-inline'",
            'https://fonts.googleapis.com',
        ],
        'upgrade-insecure-requests': [],
    }

    const cspHeader = Object.entries(cspHeaderObj)
        .map(([key, value]) =>
            value.length > 0 ? `${key} ${value.join(' ')}` : key
        )
        .join('; ')

    const requestHeaders = new Headers(request.headers)

    // requestHeaders.set('x-nonce', nonce)

    requestHeaders.set('Content-Security-Policy', cspHeader)

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    response.headers.set('Content-Security-Policy', cspHeader)

    return response
}
