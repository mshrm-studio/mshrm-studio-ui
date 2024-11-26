export default function FormFieldGroup({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="space-y-8 lg:space-y-0 lg:grid lg:gap-8 lg:grid-cols-2">
            {children}
        </div>
    )
}
