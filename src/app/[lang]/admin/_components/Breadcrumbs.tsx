import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/app/[lang]/admin/_components/shadcnui/breadcrumb'

type Props = {
    items: { title: string; href: string }[]
}

export default function Breadcrumbs({ items }: Props) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <>
                        {index > 0 && <BreadcrumbSeparator />}

                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink href={item.href}>
                                {item.title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
