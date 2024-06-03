import ToolDto from '@/utils/dto/Tool'
import SpacesImg from '@/components/SpacesImg'

export default function Tool({ tool }: { tool: ToolDto }) {
    return (
        <div className="space-y-2 flex flex-col items-center justify-center">
            <div>
                <SpacesImg
                    className="h-[63px] w-[63px]"
                    src={`static/stack/${tool.logoUrl}`}
                    alt={tool.name}
                />
            </div>

            <div className="text-center">
                <label className="font-bold text-sm">{tool.name}</label>
            </div>
        </div>
    )
}
