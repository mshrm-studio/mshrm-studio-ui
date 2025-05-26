import { Dictionary } from '@/app/[lang]/dictionaries'
import { DateTime } from 'luxon'

export default function FooterAllRightsReserved({
    dict,
}: {
    dict: Dictionary
}) {
    return (
        <div className="mt-24 text-sm text-[#818181] font-bold">
            <p>
                © {dict.footer.allRightsReserved} {DateTime.now().year}.
            </p>
        </div>
    )
}
