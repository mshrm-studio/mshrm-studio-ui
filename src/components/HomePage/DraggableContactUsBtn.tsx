'use client'

import ContactUsBtn from '@/components/ContactUsBtn'
import DimensionsContext from '@/utils/context/Dimensions'
import { motion, useDragControls } from 'framer-motion'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'

export default function HomePageDraggableContactUsBtn() {
    const { dimensions } = useContext(DimensionsContext)

    const controls = useDragControls()

    const buttonRef = useRef(null)

    const [buttonDimensions, setButtonDimensions] = useState({
        width: 0,
        height: 0,
    })

    useEffect(() => {
        if (buttonRef.current) {
            const { offsetWidth, offsetHeight } = buttonRef.current

            setButtonDimensions({
                width: offsetWidth,
                height: offsetHeight,
            })
        }
    }, [])

    const leftConstraint = useMemo(() => {
        return -(dimensions.viewportWidth - buttonDimensions.width)
    }, [dimensions.viewportWidth, buttonDimensions.width])

    const topConstraint = useMemo(() => {
        return -(dimensions.viewportHeight - buttonDimensions.height)
    }, [dimensions.viewportHeight, buttonDimensions.height])

    const bottomConstraint = useMemo(() => {
        return dimensions.documentHeight - dimensions.viewportHeight
    }, [dimensions.documentHeight, dimensions.viewportHeight])

    return (
        <motion.div
            ref={buttonRef}
            className="absolute bottom-0 right-0 z-[100]"
            drag
            dragControls={controls}
            dragConstraints={{
                top: topConstraint,
                left: leftConstraint,
                right: 0,
                bottom: bottomConstraint,
            }}
            data-document-height={dimensions.documentHeight}
            data-height={buttonDimensions.width}
            data-width={buttonDimensions.width}
        >
            <ContactUsBtn />
        </motion.div>
    )
}
