import { z } from 'zod'
import { Dictionary } from '@/app/[lang]/dictionaries'
import { RoleType, roleTypes } from '@/utils/enums/RoleType'

// 1 KB = 1 * 1024 bytes
// 200 KB = 200 * 1024 bytes
// 1 MB = 1024 * 1024 bytes (1024 KB)
// 5 MB = 5 * 1024 * 1024 bytes

export const createFormSchema = (dict: Dictionary) =>
    z.object({
        email: z.string().email(),
        firstName: z
            .string()
            .min(2, {
                message: dict.form.rule.min.length.replace(':minimum', '2'),
            })
            .max(50, {
                message: dict.form.rule.max.length.replace(':maximum', '50'),
            }),
        lastName: z
            .string()
            .min(2, {
                message: dict.form.rule.min.length.replace(':minimum', '2'),
            })
            .max(50, {
                message: dict.form.rule.max.length.replace(':maximum', '50'),
            }),
        roles: z.array(z.enum(roleTypes as [RoleType, ...RoleType[]])),
    })
