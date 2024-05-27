'use client'

import BrandLogo from '@/components/Brand/Logo'
import ThemeContext from '@/utils/context/Theme'
import Link from 'next/link'
import { useContext, useMemo } from 'react'

type Props = {}

const HeaderLogo: React.FC<Props> = ({}) => {
    const { darkClassToggled } = useContext(ThemeContext)

    const logoColor = useMemo(() => {
        return darkClassToggled ? 'white' : 'black'
    }, [darkClassToggled])

    return (
        <Link href="/">
            <BrandLogo className="h-[48px]" color={logoColor} />
        </Link>
    )
}

export default HeaderLogo
