import type { ReactNode } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"

type SelectDropdownProps = {
    placeholder: string,
    label: string,
    data: any,
    func: ( data: any ) => ReactNode
}

export function SelectDropdown ( {
    placeholder, label, data, func
}: SelectDropdownProps ) {

    return <Select>

        <SelectTrigger className="w-full">
            <SelectValue placeholder={ placeholder } />
        </SelectTrigger>

        <SelectContent>
            <SelectGroup>

                <SelectLabel>{ label }</SelectLabel>

                { func( data ) }

            </SelectGroup>
        </SelectContent>
    </Select>
}
