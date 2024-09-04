import { ComponentType, SVGProps } from 'react'

export default interface MainMenuItem {
    id: string
    actionText: string
    href?: string
    appendedIcon?: ComponentType<SVGProps<SVGSVGElement>>
    prependedLabel?: string
}
