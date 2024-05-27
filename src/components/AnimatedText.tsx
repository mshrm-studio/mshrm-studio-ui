import { Variant, motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import GraphemeSplitter from 'grapheme-splitter'

type AnimatedTextProps = {
    text: string | string[]
    el?: keyof JSX.IntrinsicElements
    className?: string
    once?: boolean
    repeatDelay?: number
    animation?: {
        hidden: Variant
        visible: Variant
    }
}

const defaultAnimations = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.1,
        },
    },
}

export const AnimatedText = ({
    text,
    el: Wrapper = 'p',
    className,
    once,
    repeatDelay,
    animation = defaultAnimations,
}: AnimatedTextProps) => {
    const splitter = new GraphemeSplitter()
    const controls = useAnimation()
    const ref = useRef(null)
    const isInView = useInView(ref, { amount: 0.5, once })

    const textArray = useMemo(() => {
        return Array.isArray(text) ? text : [text]
    }, [text])

    useEffect(() => {
        let timeout: NodeJS.Timeout

        const show = () => {
            controls.start('visible')

            if (repeatDelay) {
                timeout = setTimeout(async () => {
                    await controls.start('hidden')

                    controls.start('visible')
                }, repeatDelay)
            }
        }

        if (isInView) {
            show()
        } else {
            controls.start('hidden')
        }

        return () => clearTimeout(timeout)
    }, [isInView])

    return (
        <Wrapper className={className}>
            <span className="sr-only">{textArray.join(' ')}</span>

            {/* <span className="block">{textArray.join(' ')}</span>

            <span className="block">
                {textArray.map((line, lineIndex) => (
                    <span key={`${line}-${lineIndex}`}>
                        {line.split(' ').map((word, wordIndex) => (
                            <span key={`${word}-${wordIndex}`}>{word}</span>
                        ))}
                    </span>
                ))}
            </span> */}

            <motion.span
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                    hidden: {},
                }}
                aria-hidden
            >
                {textArray.map((line, lineIndex) => (
                    <span className="block" key={`${line}-${lineIndex}`}>
                        {line.split(' ').map((word, wordIndex) => (
                            <span
                                className="inline-block"
                                key={`${word}-${wordIndex}`}
                            >
                                {splitter
                                    .splitGraphemes(word)
                                    .map((char, charIndex) => (
                                        <motion.span
                                            key={`${char}-${charIndex}`}
                                            className="inline-block"
                                            variants={animation}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                <span className="inline-block">&nbsp;</span>
                            </span>
                        ))}
                    </span>
                ))}
            </motion.span>
        </Wrapper>
    )
}

export default AnimatedText
