import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/[lang]/admin/_components/shadcnui/select'
import FormItem from '@/app/[lang]/admin/_components/FormItem/FormItem'
import { FormControl } from '@/app/[lang]/admin/_components/shadcnui/form'

export default function SelectFormItem({
    field,
    label,
    options,
    placeholder,
    description,
}: {
    field: any
    label: string
    options: { label: string; value: string }[]
    placeholder: string
    description: string
}) {
    return (
        <FormItem label={label} description={description} isSelect>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                </FormControl>

                <SelectContent>
                    {options.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </FormItem>
    )
}
