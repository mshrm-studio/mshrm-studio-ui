type Props = {
    children: React.ReactNode
    errorMessage?: string
    fieldId?: string
    label?: string
}

export default function FormField({
    children,
    errorMessage,
    fieldId,
    label,
}: Props) {
    return (
        <div>
            {label && (
                <div className="mb-1">
                    <label
                        htmlFor={fieldId}
                        className="text-[#555555] font-extrabold"
                    >
                        {label}
                    </label>
                </div>
            )}

            {children}

            {errorMessage && (
                <p className="mt-1 text-red-600">{errorMessage}</p>
            )}
        </div>
    )
}
