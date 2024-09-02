import { TrashIcon } from '@heroicons/react/24/outline'
import styles from '@/styles/input/addedFile.module.css'

type Props = {
    addedFile: File
    onRemoveClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const InputAddedFile: React.FC<Props> = ({ addedFile, onRemoveClick }) => {
    return (
        <div className={styles.addedFile}>
            <span className={styles.fileName}>{addedFile.name}</span>

            <button
                aria-label={`TODO (translate): Delete file`}
                title={`TODO (translate): Delete file`}
                onClick={onRemoveClick}
            >
                <TrashIcon className={styles.trashIcon} />
            </button>
        </div>
    )
}

export default InputAddedFile
