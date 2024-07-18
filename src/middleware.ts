import { NextRequest } from 'next/server'
import { localeMiddleware } from './middleware/locale'
import { cspMiddleware } from './middleware/csp'

export function middleware(request: NextRequest) {
    const localeResponse = localeMiddleware(request)

    if (localeResponse) return localeResponse

    return cspMiddleware(request)
}

export const config = {
    matcher: [
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
}

// OLD CONFIG

// export const config = {
//     matcher: [
//         // Skip all internal paths (_next)
//         '/((?!_next).*)',
//         // Optional: only run on root (/) URL
//         // '/'
//     ],
// }
