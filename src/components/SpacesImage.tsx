import Image from 'next/image'

type Props = {
    alt: string
    className?: string
    imgClassName?: string
    priority?: boolean
    src: string
}

const SpacesImage: React.FC<Props> = ({
    alt,
    className = 'relative',
    imgClassName = 'object-cover',
    priority,
    src,
}) => {
    return (
        <div className={`${className} relative`}>
            <Image
                src={
                    src.startsWith('http')
                        ? src
                        : src.startsWith('/')
                        ? process.env.NEXT_PUBLIC_DO_STORAGE_URL + src
                        : `${process.env.NEXT_PUBLIC_DO_STORAGE_URL}/${src}`
                }
                fill
                className={imgClassName}
                priority={priority}
                alt={alt}
            />
        </div>
    )
}

export default SpacesImage
