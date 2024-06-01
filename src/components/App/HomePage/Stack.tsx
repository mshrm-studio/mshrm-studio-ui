'use client'

import ToolList from '@/components/App/Tool/List'
import tools from '@/utils/content/tools'
import useDictionary from '@/utils/hooks/useDictionary'

export default function HomePageTools() {
    const dict = useDictionary()

    return (
        <section className="px-6 xl:max-w-site xl:mx-auto">
            <div className="mb-12">
                <h2 className="font-extrabold text-[33px] md:text-[44px] xl:text-[55px]">
                    {dict.homepage.ourStack}
                </h2>
            </div>

            <ToolList tools={tools} />
        </section>
    )
}
