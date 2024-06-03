export enum RoleType {
    User = 'User',
    Admin = 'Admin',
}

export const roleTypes = Object.values(RoleType)

export function isRoleType(value: unknown): value is RoleType {
    return typeof value === 'string' && (roleTypes as string[]).includes(value)
}
