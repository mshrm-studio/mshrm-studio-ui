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

export interface UserResponse {
    data: User
}

export interface UserListResponse {
    data: {
        results: User[]
    }
}

export function isUser(user: unknown): user is User {
    return (
        user !== null &&
        typeof user === 'object' &&
        'email' in user &&
        typeof user.email === 'string'
    )
}

export function isUserResponse(input: unknown): input is UserResponse {
    return (
        typeof input === 'object' &&
        input !== null &&
        'data' in input &&
        isUser(input.data)
    )
}

export function isUserList(input: unknown): input is User[] {
    return Array.isArray(input) && input.every((item) => isUser(item))
}

export function isUserListResponse(input: unknown): input is UserListResponse {
    return (
        typeof input === 'object' &&
        input !== null &&
        'data' in input &&
        typeof input.data === 'object' &&
        input.data !== null &&
        'results' in input.data &&
        isUserList(input.data.results)
    )
}
