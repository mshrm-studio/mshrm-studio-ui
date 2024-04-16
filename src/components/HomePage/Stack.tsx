'use client'

import DictionaryContext from '@/utils/context/Dictionary'
import { useContext, useMemo } from 'react'
import ToolList from '@/components/Tool/List'

export default function HomePageTools() {
    const dictionary = useContext(DictionaryContext)

    if (!dictionary) {
        throw new Error('No dictionary found')
    }

    const tools = useMemo(() => {
        return [
            { name: 'Laravel', link: '#', logo: '#' },
            { name: 'React', link: '#', logo: '#' },
            { name: 'Vue', link: '#', logo: '#' },
            { name: 'Nuxt', link: '#', logo: '#' },
            { name: 'Tailwind', link: '#', logo: '#' },
            { name: 'TablePlus', link: '#', logo: '#' },
            { name: 'Visual Studio', link: '#', logo: '#' },
            { name: '.NET', link: '#', logo: '#' },
            { name: 'Teams', link: '#', logo: '#' },
            { name: 'C#', link: '#', logo: '#' },
            { name: 'MySQL', link: '#', logo: '#' },
            { name: 'MSSQL', link: '#', logo: '#' },
            { name: 'DevOps', link: '#', logo: '#' },
            { name: 'Azure', link: '#', logo: '#' },
            { name: 'Digital Ocean', link: '#', logo: '#' },
            { name: 'AWS', link: '#', logo: '#' },
            { name: 'Mailgun', link: '#', logo: '#' },
            { name: 'Docker', link: '#', logo: '#' },
            { name: 'Jira', link: '#', logo: '#' },
            { name: 'ChatGPT', link: '#', logo: '#' },
            { name: 'Adobe', link: '#', logo: '#' },
            { name: 'Figma', link: '#', logo: '#' },
            { name: 'GitHub', link: '#', logo: '#' },
            { name: 'Vite', link: '#', logo: '#' },
            { name: 'Web3', link: '#', logo: '#' },
        ]
    }, [])

    return (
        <section className="xl:max-w-site xl:mx-auto">
            <div className="mb-12">
                <h2 className="font-extrabold text-[33px] md:text-[44px] xl:text-[55px]">
                    {dictionary.homepage.ourStack}
                </h2>
            </div>

            <ToolList tools={tools} />
        </section>
    )
}
