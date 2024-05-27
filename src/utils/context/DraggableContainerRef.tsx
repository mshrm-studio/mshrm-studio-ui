import { MutableRefObject, createContext, useRef } from 'react'

const DraggableContainerRefContext = createContext<{
    containerRef?: MutableRefObject<HTMLDivElement | null>
}>({})

export default DraggableContainerRefContext
