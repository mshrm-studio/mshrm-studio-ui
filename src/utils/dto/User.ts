import { RoleType } from '@/utils/enums/RoleType'

export default interface User {
    guidId: string
    email: string | null
    firstName: string | null
    lastName: string | null
    confirmed: boolean
    roleType: RoleType
}
