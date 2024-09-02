import Image from 'next/image'

type Props = {
    alt: string
    className?: string
    height?: number
    imgClassName?: string
    priority?: boolean
    sizes?: string
    src: string
    width?: number
}

const SpacesImage: React.FC<Props> = ({
    alt,
    className,
    height,
    imgClassName,
    priority,
    sizes,
    src,
    width,
}) => {
    return typeof height === 'number' && typeof width === 'number' ? (
        <Image
            src={
                src.startsWith('http')
                    ? src
                    : src.startsWith('/')
                    ? process.env.NEXT_PUBLIC_DO_STORAGE_URL + src
                    : `${process.env.NEXT_PUBLIC_DO_STORAGE_URL}/${src}`
            }
            className={className}
            priority={priority}
            alt={alt}
            height={height}
            width={width}
        />
    ) : (
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
                className={imgClassName || 'object-cover'}
                priority={priority}
                alt={alt}
                sizes={sizes}
            />
        </div>
    )
}

export default SpacesImage
