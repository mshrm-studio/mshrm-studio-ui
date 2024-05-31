'use client'

import DictionaryContext from '@/utils/context/Dictionary'
import { useContext } from 'react'
import ToolList from '@/components/App/Tool/List'
import tools from '@/utils/content/tools'

export default function HomePageTools() {
    const dictionary = useContext(DictionaryContext)

    if (!dictionary) {
        throw new Error('No dictionary found')
    }

    return (
        <section className="px-6 xl:max-w-site xl:mx-auto">
            <div className="mb-12">
                <h2 className="font-extrabold text-[33px] md:text-[44px] xl:text-[55px]">
                    {dictionary.homepage.ourStack}
                </h2>
            </div>

            <ToolList tools={tools} />
        </section>
    )
}
