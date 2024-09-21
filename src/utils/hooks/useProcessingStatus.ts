import { ProcessingStatus } from '@/utils/enums/ProcessingStatus'
import { useState } from 'react'

const useProcessingStatus = () => {
    const [status, setStatus] = useState<ProcessingStatus>(
        ProcessingStatus.Idle
    )

    function startProcessing() {
        setStatus(ProcessingStatus.Pending)
    }

    function stopProcessing() {
        setStatus(ProcessingStatus.Success)
    }

    return { setStatus, startProcessing, status, stopProcessing }
}

export default useProcessingStatus
