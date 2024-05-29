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

    const bottom = useMemo(() => {
        return 16
    }, [dimensions.viewportWidth])

    const right = useMemo(() => {
        return dimensions.viewportWidth >= 1024
            ? 16
            : dimensions.viewportWidth / 2 - buttonDimensions.width / 2
    }, [buttonDimensions.width, dimensions.viewportWidth])

    const leftConstraint = useMemo(() => {
        return -(dimensions.viewportWidth - (buttonDimensions.width + right))
    }, [dimensions.viewportWidth, buttonDimensions.width, right])

    const topConstraint = useMemo(() => {
        return -(dimensions.viewportHeight - (buttonDimensions.height + bottom))
    }, [bottom, dimensions.viewportHeight, buttonDimensions.height])

    const bottomConstraint = useMemo(() => {
        return dimensions.documentHeight - (dimensions.viewportHeight - bottom)
    }, [bottom, dimensions.documentHeight, dimensions.viewportHeight])

    const rightConstraint = useMemo(() => {
        return right
    }, [right])

    return (
        <motion.div
            ref={buttonRef}
            className="absolute z-[100]"
            style={{ bottom: bottom, right: right }}
            drag
            dragControls={controls}
            dragConstraints={{
                top: topConstraint,
                left: leftConstraint,
                right: rightConstraint,
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
