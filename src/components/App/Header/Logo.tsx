'use client'

import BrandLogo from '@/components/Brand/Logo'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useMemo } from 'react'

type Props = {}

const HeaderLogo: React.FC<Props> = ({}) => {
    const { resolvedTheme } = useTheme()

    const logoColor = useMemo(() => {
        return resolvedTheme === 'dark' ? 'white' : 'black'
    }, [resolvedTheme])

    return (
        <Link href="/">
            <BrandLogo className="h-[48px]" color={logoColor} />
        </Link>
    )
}

export default HeaderLogo
