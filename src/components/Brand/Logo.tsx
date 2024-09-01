import SpacesImg from '@/components/SpacesImage'

type Props = {
    className?: string
    color?: 'black' | 'white'
    priority?: boolean
}

const BrandLogo: React.FC<Props> = ({ className, color, priority }) => {
    return (
        <SpacesImg
            className={className}
            src={
                color === 'black'
                    ? 'static/brand/glyph/m-glyph-black.png'
                    : 'static/brand/glyph/m-glyph-white.png'
            }
            alt={`TODO (translate): ${color} MSHRM Studio Logo`}
            priority={priority}
        />
    )
}

export default BrandLogo
