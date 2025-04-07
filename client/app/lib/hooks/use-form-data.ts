import { useState } from "react"

export function useFormData<T> ( defaultValue: T ) {
    const [ formData, setFormData ] = useState<T>( defaultValue )

    function handleChange ( e: React.ChangeEvent<HTMLInputElement> ) {
        const { name, value } = e.target
        setFormData( prev => ( { ...prev, [ name ]: value } ) )
    }

    return { formData, handleChange }
}