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
                    ? 'static/brand/m-glyph-black.png'
                    : 'static/brand/m-glyph-white.png'
            }
            alt={`TODO (translate): ${color} MSHRM Studio Logo`}
            priority={priority}
            height={23}
            width={52}
        />
    )
}

export default BrandLogo
