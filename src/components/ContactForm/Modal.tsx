'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

export default function ContactFormModal() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <motion.div className="bg-red-100" onClick={() => setOpen(true)}>
                <motion.h5>item.subtitle</motion.h5>
                <motion.h2>item.title</motion.h2>
            </motion.div>

            <AnimatePresence>
                {open && (
                    <motion.div className="bg-red-100">
                        <motion.h5>item.subtitle</motion.h5>
                        <motion.h2>item.title</motion.h2>
                        <motion.button onClick={() => setOpen(false)}>
                            item.close
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
