'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import { DateTime } from 'luxon'

export default function FooterAllRightsReserved() {
    const dict = useDictionary()

    return (
        <div className="mt-24 text-sm text-[#818181] font-bold">
            <p>
                © {dict.footer.allRightsReserved} {DateTime.now().year}.
            </p>
        </div>
    )
}
