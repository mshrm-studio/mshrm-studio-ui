'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import styles from '@/styles/footer/footer.module.css'
import { DateTime } from 'luxon'
import { useContext, useMemo } from 'react'
import LocaleContext from '@/utils/context/Locale'

export default function FooterJobBag() {
    const dict = useDictionary()

    const locale = useContext(LocaleContext)

    const dateOfPreparation = useMemo(() => {
        return DateTime.fromISO('2024-08-29')
            .setLocale(locale)
            .toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })
    }, [locale])

    return (
        <div className="mt-24 text-sm text-[#818181] font-bold">
            <p>
                {dict.footer.approvalCode}: 001A.{' '}
                {dict.footer.dateOfPreparation}: {dateOfPreparation}.{' '}
                <br className="md:hidden" />© {dict.footer.allRightsReserved}{' '}
                {DateTime.now().year}.
            </p>
        </div>
    )
}
