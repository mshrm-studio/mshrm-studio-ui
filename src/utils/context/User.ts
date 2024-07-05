import { createContext, Dispatch, SetStateAction } from 'react'
import User from '@/utils/dto/User'

// Create the context with default values
const UserContext = createContext<{
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
}>({
    user: null,
    setUser: () => {},
})

export default UserContext
