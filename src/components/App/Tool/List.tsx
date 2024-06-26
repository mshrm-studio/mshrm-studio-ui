import ToolDto from '@/utils/dto/Tool'
import Tool from '@/components/App/Tool/Tool'

export default function ToolList({ tools }: { tools: ToolDto[] }) {
    return (
        <ul className="grid grid-cols-4 gap-6 xl:grid-cols-12">
            {tools.map((tool, i) => (
                <li key={i}>
                    {tool.link ? (
                        <a href={tool.link} target="_blank" rel="noreferrer">
                            <Tool tool={tool} />
                        </a>
                    ) : (
                        <Tool tool={tool} />
                    )}
                </li>
            ))}
        </ul>
    )
}
