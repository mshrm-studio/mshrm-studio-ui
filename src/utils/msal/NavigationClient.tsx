import { NavigationClient } from '@azure/msal-browser'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

interface NavigateOptions {
    noHistory?: boolean
}

class CustomNavigationClient extends NavigationClient {
    private router: AppRouterInstance

    constructor(router: AppRouterInstance) {
        super()

        this.router = router
    }

    async navigateInternal(url: string, options: NavigateOptions) {
        const relativePath = url.replace(window.location.origin, '')

        if (options.noHistory) {
            this.router.replace(relativePath)
        } else {
            this.router.push(relativePath)
        }

        return false
    }
}

export default CustomNavigationClient
