import ToolDto from '@/utils/dto/Tool'
import Tool from '@/app/[lang]/(app)/_components/Tool/Tool'
import { Dictionary } from '@/app/[lang]/dictionaries'

export default function ToolList({
    dict,
    tools,
}: {
    dict: Dictionary
    tools: ToolDto[]
}) {
    return (
        <ul className="grid grid-cols-4 gap-6 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
            {tools.map((tool, i) => (
                <li key={i}>
                    {tool.link ? (
                        <a href={tool.link} target="_blank" rel="noreferrer">
                            <Tool dict={dict} tool={tool} />
                        </a>
                    ) : (
                        <Tool dict={dict} tool={tool} />
                    )}
                </li>
            ))}
        </ul>
    )
}
