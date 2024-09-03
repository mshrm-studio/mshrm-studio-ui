'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import styles from '@/styles/input/addedFile.module.css'
import useDictionary from '@/utils/hooks/useDictionary'

type Props = {
    addedFile: File
    onRemoveClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const InputAddedFile: React.FC<Props> = ({ addedFile, onRemoveClick }) => {
    const dict = useDictionary()

    return (
        <div className={styles.addedFile}>
            <span className={styles.fileName}>{addedFile.name}</span>

            <button
                aria-label={dict.form.deleteFile}
                title={dict.form.deleteFile}
                onClick={onRemoveClick}
            >
                <TrashIcon className={styles.trashIcon} />
            </button>
        </div>
    )
}

export default InputAddedFile
