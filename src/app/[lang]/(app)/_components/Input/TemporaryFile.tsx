'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import styles from '@/app/[lang]/(app)/_styles/input/temporaryFile.module.css'
import useDictionary from '@/utils/hooks/useDictionary'
import TemporaryFile from '@/utils/dto/TemporaryFile'

type Props = {
    file: TemporaryFile
    setTemporaryFiles: React.Dispatch<React.SetStateAction<TemporaryFile[]>>
}

const InputTemporaryFile: React.FC<Props> = ({ file, setTemporaryFiles }) => {
    const dict = useDictionary()

    function handleRemove() {
        setTemporaryFiles((prev) => prev.filter((tf) => tf.key !== file.key))
    }

    return (
        <div className={styles.temporaryFile}>
            <span className={styles.fileName}>{file.key}</span>

            <button
                aria-label={dict.form.deleteFile}
                title={dict.form.deleteFile}
                onClick={handleRemove}
            >
                <TrashIcon className={styles.trashIcon} />
            </button>
        </div>
    )
}

export default InputTemporaryFile
