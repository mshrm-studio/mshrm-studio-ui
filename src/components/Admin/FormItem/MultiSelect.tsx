import {
    FormControl,
    FormItem,
    FormLabel,
} from '@/components/Admin/shadcnui/form'
import { Checkbox } from '@/components/Admin/shadcnui/checkbox'
import SelectOption from '@/utils/dto/SelectOption'

type Props = {
    field: any
    item: SelectOption
}

export default function MultiSelectFormItem({ field, item }: Props) {
    return (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
                <Checkbox
                    checked={field.value?.includes(item.value)}
                    onCheckedChange={(checked) => {
                        return checked
                            ? field.onChange([...field.value, item.value])
                            : field.onChange(
                                  field.value?.filter(
                                      (value: string | number) =>
                                          value !== item.value
                                  )
                              )
                    }}
                />
            </FormControl>

            <FormLabel className="font-normal">{item.label}</FormLabel>
        </FormItem>
    )
}
