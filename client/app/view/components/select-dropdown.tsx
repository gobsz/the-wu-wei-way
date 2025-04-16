import type { ReactNode } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"

type SelectDropdownProps = {
    placeholder: string,
    label: string,
    listData: any,
    listFunction: ( listData: any ) => ReactNode
}

export function SelectDropdown ( {
    placeholder, label, listData, listFunction
}: SelectDropdownProps ) {

    return <Select>

        <SelectTrigger className="w-full">
            <SelectValue placeholder={ placeholder } />
        </SelectTrigger>

        <SelectContent>
            <SelectGroup>

                <SelectLabel>{ label }</SelectLabel>

                { listFunction( listData ) }

            </SelectGroup>
        </SelectContent>
    </Select>
}
