import { ComponentType, SVGProps } from 'react'

export default interface MainNavigationItem {
    id: string
    actionText: string
    href?: string
    appendedIcon?: ComponentType<SVGProps<SVGSVGElement>>
    prependedLabel?: string
}
