'use client'

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/Admin/shadcnui/sheet'
import { Menu, Package2 } from 'lucide-react'
import AdminLayoutNavigation from '@/components/Admin/Layout/Navigation'
import { Button } from '@/components/Admin/shadcnui/button'
import useDictionary from '@/utils/hooks/useDictionary'
import LocaleLink from '@/components/LocaleLink'

export default function AdminLayoutTouchMenu() {
    const dict = useDictionary()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    aria-label={dict.header.toggleNavigationMenu}
                    title={dict.header.toggleNavigationMenu}
                    variant="outline"
                    size="icon"
                    className="lg:hidden"
                >
                    <Menu className="h-6 w-6" />

                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="left">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <LocaleLink
                            href="/admin"
                            className="flex items-center gap-2 font-semibold"
                        >
                            <Package2 className="h-6 w-6" />

                            <span className="">MSHRM CMS</span>
                        </LocaleLink>
                    </div>

                    <div className="flex-1 overflow-auto py-2">
                        <AdminLayoutNavigation />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
