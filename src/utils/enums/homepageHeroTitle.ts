export enum HomepageHeroTitle {
    Art = 'Art',
    Design = 'Design',
    Dev = 'Dev',
}

export const homepageHeroTitles = Object.values(HomepageHeroTitle)

export function isHomepageHeroTitle(
    value: unknown
): value is HomepageHeroTitle {
    return (
        typeof value === 'string' &&
        (homepageHeroTitles as string[]).includes(value)
    )
}
