import ToolDto from '@/utils/dto/Tool'
import SpacesImg from '@/components/SpacesImage'
import styles from '@/styles/tool.module.css'

export default function Tool({ tool }: { tool: ToolDto }) {
    return (
        <div className="space-y-2 flex flex-col items-center justify-center">
            <div>
                <SpacesImg
                    className={`${styles.toolImg} ${styles.lightToolImg}`}
                    src={`static/tools/${tool.lightLogoUrl}`}
                    alt={`TODO (translate): dark ${tool.name} logo`}
                    height={63}
                    width={63}
                />

                <SpacesImg
                    className={`${styles.toolImg} ${styles.darkToolImg}`}
                    src={`static/tools/${tool.darkLogoUrl}`}
                    alt={`TODO (translate): light ${tool.name} logo`}
                    height={63}
                    width={63}
                />
            </div>

            <div className="text-center">
                <label className="font-bold text-sm">{tool.name}</label>
            </div>
        </div>
    )
}
