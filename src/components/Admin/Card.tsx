import {
    Card as ShadcnuiCard,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/Admin/shadcnui/card'

export default function Card({
    children,
    title,
    description,
}: {
    children: React.ReactNode
    title: string
    description: string
}) {
    return (
        <ShadcnuiCard>
            <CardHeader>
                <CardTitle>{title}</CardTitle>

                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent>{children}</CardContent>
        </ShadcnuiCard>
    )
}
