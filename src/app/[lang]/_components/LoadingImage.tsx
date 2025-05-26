import BlobImage from '@/app/[lang]/_components/BlobImage'

type Props = {
    height: number
    priority: boolean
    width: number
}

export default function LoadingImage({ height, priority, width }: Props) {
    return (
        <BlobImage
            alt="Loading..."
            src="static/misc/m-loader-64-darkmode.gif"
            height={height}
            width={width}
            priority={priority}
        />
    )
}
