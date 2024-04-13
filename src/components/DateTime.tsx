'use client'

import { DateTime as LuxonDateTime } from 'luxon'
import { useMemo } from 'react'

export default function DateTime({ dateTime }: { dateTime: string }) {
    const formattedDateTime = useMemo(() => {
        return LuxonDateTime.fromISO(dateTime)
            .toLocal()
            .toLocaleString(LuxonDateTime.TIME_24_WITH_SECONDS)
    }, [dateTime])

    return <>{formattedDateTime}</>
}
