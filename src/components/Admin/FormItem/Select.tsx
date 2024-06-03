import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/Admin/shadcnui/select'
import FormItem from '@/components/Admin/FormItem/FormItem'
import { FormControl } from '@/components/Admin/shadcnui/form'

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
