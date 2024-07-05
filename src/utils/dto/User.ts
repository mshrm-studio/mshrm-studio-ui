import { RoleType } from '@/utils/enums/RoleType'

export default interface User {
    guidId?: string
    email: string
    firstName?: string | null
    fullName?: string | null
    lastName?: string | null
    confirmed: boolean
    roleType: RoleType
}

export function isUser(user: unknown): user is User {
    return (
        user !== null &&
        typeof user === 'object' &&
        'email' in user &&
        typeof user.email === 'string'
    )
}
