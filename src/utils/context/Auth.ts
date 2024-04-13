import { AccountInfo } from '@azure/msal-browser'
import { createContext, Dispatch, SetStateAction } from 'react'

// Create the context with default values
const AuthContext = createContext<{
    bearerToken: string | null
    setBearerToken: Dispatch<SetStateAction<string | null>>
    user: AccountInfo | null
    setUser: Dispatch<SetStateAction<AccountInfo | null>>
}>({
    bearerToken: null,
    setBearerToken: () => {},
    user: null,
    setUser: () => {}, // This is a noop function just for initial context value. It will be overridden by the actual useState function provided by the component that provides this context.
})

export default AuthContext
