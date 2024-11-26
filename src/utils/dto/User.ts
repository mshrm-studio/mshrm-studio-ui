import { RoleType } from '@/utils/enums/RoleType'
import ApiPaginatedResponse, {
    isApiPaginatedResponse,
} from '@/utils/dto/ApiPaginatedResponse'

export default interface User {
    guidId?: string
    email: string
    firstName?: string | null
    fullName?: string | null
    lastName?: string | null
    roles: RoleType[]
}

export interface UserListResponse
    extends Omit<ApiPaginatedResponse, 'results'> {
    results: User[]
}

export function isUser(input: unknown): input is User {
    return typeof input === 'object' && input !== null && 'name' in input
}

export function isUserList(input: unknown): input is User[] {
    return Array.isArray(input) && input.every((item) => isUser(item))
}

export function isUserListResponse(input: unknown): input is UserListResponse {
    return isApiPaginatedResponse(input) && isUserList(input.results)
}
