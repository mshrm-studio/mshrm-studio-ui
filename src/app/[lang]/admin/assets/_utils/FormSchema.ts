import { z } from 'zod'
import { Dictionary } from '@/app/[lang]/dictionaries'
import { AssetType, assetTypes } from '@/utils/enums/AssetType'
import {
    PricingProvider,
    pricingProviders,
} from '@/utils/enums/PricingProvider'

// 1 KB = 1 * 1024 bytes
// 200 KB = 200 * 1024 bytes
// 1 MB = 1024 * 1024 bytes (1024 KB)
// 5 MB = 5 * 1024 * 1024 bytes

export const createFormSchema = (dict: Dictionary) =>
    z.object({
        asset: z
            .string()
            .min(1, {
                message: dict.form.rule.min.length.replace(':minimum', '1'),
            })
            .max(50, {
                message: dict.form.rule.max.length.replace(':maximum', '50'),
            }),
        assetType: z.enum(assetTypes as [AssetType, ...AssetType[]]),
        decimalPlaces: z.number(),
        description: z
            .string()
            .min(5, {
                message: dict.form.rule.min.length.replace(':minimum', '5'),
            })
            .max(500, {
                message: dict.form.rule.max.length.replace(':maximum', '500'),
            }),
        logo: z.union([
            z
                .instanceof(File)
                .refine((file) => file.size <= 200 * 1024, {
                    message: dict.form.rule.max.size.replace(':size', '200KB'),
                })
                .refine(
                    (file) =>
                        [
                            'image/jpg',
                            'image/jpeg',
                            'image/png',
                            'image/gif',
                            'image/svg',
                        ].includes(file.type),
                    {
                        message: dict.form.rule.image,
                    }
                ),
            z.undefined(),
        ]),
        name: z
            .string()
            .min(2, {
                message: dict.form.rule.min.length.replace(':minimum', '2'),
            })
            .max(50, {
                message: dict.form.rule.max.length.replace(':maximum', '50'),
            }),
        providerType: z.enum(
            pricingProviders as [PricingProvider, ...PricingProvider[]]
        ),
        symbolNative: z
            .string()
            .min(1, {
                message: dict.form.rule.min.length.replace(':minimum', '1'),
            })
            .max(10, {
                message: dict.form.rule.max.length.replace(':maximum', '10'),
            }),
        symbol: z
            .string()
            .min(1, {
                message: dict.form.rule.min.length.replace(':minimum', '1'),
            })
            .max(50, {
                message: dict.form.rule.max.length.replace(':maximum', '50'),
            }),
    })
