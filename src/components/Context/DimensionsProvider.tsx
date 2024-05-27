'use client'

import React, { useState, useEffect } from 'react'
import DimensionsContext, { Dimensions } from '@/utils/context/Dimensions'

const DimensionsProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const [dimensions, setDimensions] = useState<Dimensions>({
        documentHeight: 0,
        headerHeight: 0,
        viewportHeight: 0,
        viewportOrientation: 'Portrait',
        viewportWidth: 0,
    })

    // Function to update dimensions
    function updateDimensions() {
        setDimensions({
            documentHeight: Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight,
                document.body.clientHeight,
                document.documentElement.clientHeight
            ),
            viewportHeight: window.innerHeight,
            viewportWidth: window.innerWidth,
            headerHeight: document.querySelector('header')?.offsetHeight || 0,
            viewportOrientation:
                window.innerHeight > window.innerWidth
                    ? 'Portrait'
                    : 'Landscape',
        })
    }

    useEffect(() => {
        window.addEventListener('resize', updateDimensions)

        updateDimensions()

        setTimeout(updateDimensions, 1000)

        setTimeout(updateDimensions, 5000)

        setTimeout(updateDimensions, 10000)

        return () => {
            window.removeEventListener('resize', updateDimensions)
        }
    }, [])

    return (
        <DimensionsContext.Provider value={{ dimensions, setDimensions }}>
            {children}
        </DimensionsContext.Provider>
    )
}

export default DimensionsProvider
