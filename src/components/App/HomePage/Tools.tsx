import { Dictionary } from '@/app/[lang]/dictionaries'
import ToolList from '@/components/App/Tool/List'
import tools from '@/utils/content/tools'
import { ToolType } from '@/utils/enums/ToolType'

export default function HomePageTools({ dict }: { dict: Dictionary }) {
    return (
        <section className="px-6 xl:max-w-site xl:mx-auto">
            <div className="mb-12">
                <h2 className="font-extrabold text-[2.0625rem] xl:text-[3.4375rem]">
                    {dict.homepage.ourStack}
                </h2>
            </div>

            <ToolList
                tools={tools.map((tool) => ({
                    ...tool,
                    guidId: 'TODO',
                    rank: 0,
                    toolType: ToolType.Technology,
                    description: null,
                    logoGuidId: 'TODO',
                }))}
            />
        </section>
    )
}
