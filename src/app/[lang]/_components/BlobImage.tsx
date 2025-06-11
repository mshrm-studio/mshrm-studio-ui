import Image from 'next/image'
import clsx from 'clsx'

type Props = {
    alt: string
    className?: string
    height?: number
    imgClassName?: string
    priority?: boolean
    sizes?: string
    src: string
    unoptimized?: boolean
    width?: number
}

const BlobImage: React.FC<Props> = ({
    alt,
    className,
    height,
    imgClassName,
    priority,
    sizes,
    src,
    unoptimized,
    width,
}) => {
    return typeof height === 'number' && typeof width === 'number' ? (
        <Image
            alt={alt}
            className={className}
            height={height}
            priority={priority}
            src={
                src.startsWith('http')
                    ? src
                    : src.startsWith('/')
                    ? process.env.NEXT_PUBLIC_BLOB_STORAGE_URL + src
                    : `${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/${src}`
            }
            unoptimized={unoptimized}
            width={width}
        />
    ) : (
        <div className={clsx(className, 'relative')}>
            <Image
                alt={alt}
                className={imgClassName || 'object-cover'}
                fill
                priority={priority}
                sizes={sizes}
                src={
                    src.startsWith('http')
                        ? src
                        : src.startsWith('/')
                        ? process.env.NEXT_PUBLIC_BLOB_STORAGE_URL + src
                        : `${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/${src}`
                }
                unoptimized={unoptimized}
            />
        </div>
    )
}

export default BlobImage
