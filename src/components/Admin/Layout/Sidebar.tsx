import { loadDictionaries } from '@/app/[lang]/dictionaries'
import { Locale } from '@/utils/enums/Locale'
import { Package2 } from 'lucide-react'
import AdminLayoutNavigation from '@/components/Admin/Layout/Navigation'
import Link from 'next/link'
import DictionaryContextProvider from '@/components/Provider/Dictionary'

export default async function AdminLayoutSidebar({
    locale,
}: {
    locale: Locale
}) {
    const dict = await loadDictionaries(locale, ['admin/header'])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-semibold"
                            prefetch={false}
                        >
                            <Package2 className="h-6 w-6" />

                            <span className="">MSHRM CMS</span>
                        </Link>
                    </div>

                    <div className="flex-1 overflow-auto py-2">
                        <AdminLayoutNavigation />
                    </div>
                </div>
            </div>
        </DictionaryContextProvider>
    )
}
