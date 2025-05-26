'use client'

import { DateTimeFormatOptions, DateTime as LuxonDateTime } from 'luxon'
import { useMemo } from 'react'

interface Props {
    dateTime: string
    format?: DateTimeFormatOptions | null
}

export default function DateTime({ dateTime, format }: Props) {
    const formattedDateTime = useMemo(() => {
        return LuxonDateTime.fromISO(dateTime)
            .toLocal()
            .toLocaleString(format || LuxonDateTime.TIME_24_WITH_SECONDS)
    }, [dateTime])

    return <>{formattedDateTime}</>
}
