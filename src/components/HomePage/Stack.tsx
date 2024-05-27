'use client'

import DictionaryContext from '@/utils/context/Dictionary'
import { useContext, useMemo } from 'react'
import ToolList from '@/components/Tool/List'
import stack from '@/utils/content/stack'

export default function HomePageTools() {
    const dictionary = useContext(DictionaryContext)

    if (!dictionary) {
        throw new Error('No dictionary found')
    }

    return (
        <section className="xl:max-w-site xl:mx-auto">
            <div className="mb-12">
                <h2 className="font-extrabold text-[33px] md:text-[44px] xl:text-[55px]">
                    {dictionary.homepage.ourStack}
                </h2>
            </div>

            <ToolList tools={stack} />
        </section>
    )
}
