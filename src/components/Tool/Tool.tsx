import ToolDto from '@/utils/dto/Tool'
import styles from '@/utils/styles/tool.module.css'

export default function Tool({ tool }: { tool: ToolDto }) {
    return (
        <div className="space-y-2 flex flex-col items-center justify-center">
            <div className={styles.imageWrapper}>
                {/* <img src={tool.logo} alt={tool.name} /> */}
                <div className="h-full w-full bg-white rounded-full flex items-center justify-center">
                    IMG
                </div>
            </div>

            <div className="text-center">
                <label className="font-bold text-sm">{tool.name}</label>
            </div>
        </div>
    )
}
