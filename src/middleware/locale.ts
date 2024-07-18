import { NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { Locale, isLocale, locales } from '@/utils/enums/Locale'
import type { NextRequest } from 'next/server'

// Helper function to convert Next.js Headers to a simple object
function headersToObject(headers: Headers): { [key: string]: string } {
    const headersObj: { [key: string]: string } = {}
    headers.forEach((value, key) => {
        headersObj[key] = value
    })
    return headersObj
}

// Function to get locale from cookie
function getLocaleFromCookie(request: NextRequest): string | null {
    const cookie = request.cookies.get('mshrmLocale')

    return cookie ? cookie.value : null
}

// Get the preferred locale, similar to the above or using a library
function getLocaleFromHeaders(request: NextRequest) {
    const headers = headersToObject(request.headers)
    const languages = new Negotiator({ headers }).languages()
    const defaultLocale = Locale.English
    return match(languages, locales, defaultLocale)
}

export function localeMiddleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl

    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    const localeFromCookie = getLocaleFromCookie(request)

    const locale = isLocale(localeFromCookie)
        ? localeFromCookie
        : getLocaleFromHeaders(request)

    request.nextUrl.pathname = isLocale(locale)
        ? `/${locale}${pathname}`
        : `/en${pathname}`

    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(request.nextUrl)
}
