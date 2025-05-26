'use client'

import styles from '@/app/[lang]/(app)/_styles/input/uploadedFile.module.css'
import TemporaryFile, {
    isTemporaryFileResponse,
} from '@/utils/dto/TemporaryFile'
import { ProcessingStatus } from '@/utils/enums/ProcessingStatus'
import useAxios from '@/utils/hooks/useAxios'
import useDictionary from '@/utils/hooks/useDictionary'
import useProcessingStatus from '@/utils/hooks/useProcessingStatus'
import { useEffect, useState } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

type Props = {
    file: File
    setTemporaryFiles: React.Dispatch<React.SetStateAction<TemporaryFile[]>>
}

const InputAddedFile: React.FC<Props> = ({ file, setTemporaryFiles }) => {
    const dict = useDictionary()
    const [progress, setProgress] = useState(0)
    const axios = useAxios()
    const { setStatus, status } = useProcessingStatus()

    useEffect(() => {
        if (status === ProcessingStatus.Pending) return

        setStatus(ProcessingStatus.Pending)

        let formData = new FormData()

        formData.append('file', file)

        axios
            .post(`/api/v1/files/temporary`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: function (progressEvent) {
                    if (progressEvent.total) {
                        setProgress(
                            Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            )
                        )
                    }
                },
            })
            .then((response) => {
                if (isTemporaryFileResponse(response)) {
                    setTemporaryFiles((prev) => prev.concat([response.data]))

                    setStatus(ProcessingStatus.Success)
                } else {
                    setStatus(ProcessingStatus.Error)

                    // todo: handle error
                }
            })
            .catch((_error) => {
                setStatus(ProcessingStatus.Error)

                // todo: handle error
            })
    }, [file])

    if (status === ProcessingStatus.Success) return null

    return (
        <div className={styles.uploadedFile}>
            <span className={styles.fileName}>{file.name}</span>

            {status === ProcessingStatus.Pending ? (
                <span>{progress}%</span>
            ) : (
                <ExclamationTriangleIcon className={styles.errorIcon} />
            )}
        </div>
    )
}

export default InputAddedFile
