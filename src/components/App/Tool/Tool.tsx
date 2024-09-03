import ToolDto from '@/utils/dto/Tool'
import SpacesImg from '@/components/SpacesImage'
import styles from '@/styles/tool.module.css'
import { Dictionary } from '@/app/[lang]/dictionaries'

export default function Tool({
    dict,
    tool,
}: {
    dict: Dictionary
    tool: ToolDto
}) {
    return (
        <div className="space-y-2 flex flex-col items-center justify-center">
            <div>
                <SpacesImg
                    className={`${styles.toolImg} ${styles.lightToolImg}`}
                    src={`static/tools/${tool.lightLogoUrl}`}
                    alt={dict.common.lightEntityLogo.replace(
                        ':entity',
                        tool.name
                    )}
                    height={63}
                    width={63}
                />

                <SpacesImg
                    className={`${styles.toolImg} ${styles.darkToolImg}`}
                    src={`static/tools/${tool.darkLogoUrl}`}
                    alt={dict.common.darkEntityLogo.replace(
                        ':entity',
                        tool.name
                    )}
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
