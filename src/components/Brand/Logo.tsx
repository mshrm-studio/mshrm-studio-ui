import { Dictionary } from '@/app/[lang]/dictionaries'
import BlobImage from '@/components/BlobImage'

type Props = {
    className?: string
    color?: 'black' | 'white'
    dict: Dictionary
    priority?: boolean
}

const BrandLogo: React.FC<Props> = ({ className, color, dict, priority }) => {
    return (
        <BlobImage
            className={className}
            src={
                color === 'black'
                    ? 'static/brand/m-glyph-black.png'
                    : 'static/brand/m-glyph-white.png'
            }
            alt={
                color === 'black'
                    ? dict.common.blackEntityLogo.replace(
                          ':entity',
                          'mshrm.studio'
                      )
                    : dict.common.whiteEntityLogo.replace(
                          ':entity',
                          'mshrm.studio'
                      )
            }
            priority={priority}
            height={23}
            width={52}
        />
    )
}

export default BrandLogo
