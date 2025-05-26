import ToolDto from '@/utils/dto/Tool'
import styles from '@/app/[lang]/(app)/_styles/tool.module.css'
import { Dictionary } from '@/app/[lang]/dictionaries'
import BlobImage from '@/app/[lang]/_components/BlobImage'
import clsx from 'clsx'

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
                <BlobImage
                    className={clsx(styles.toolImg, styles.lightToolImg)}
                    src={`static/tools/${tool.logoUrl}`}
                    alt={dict.common.lightEntityLogo.replace(
                        ':entity',
                        tool.name
                    )}
                    height={63}
                    width={63}
                />

                <BlobImage
                    className={clsx(styles.toolImg, styles.darkToolImg)}
                    src={`static/tools/${tool.logoUrl}`}
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
