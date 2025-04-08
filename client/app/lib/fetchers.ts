import { SERVER_URL } from "./constants/env"

export async function serverPost<T> ( endpoint: string, payload: T ) {
    try {
        const response = await fetch( SERVER_URL + endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( payload )
        } )

        const data = response.json()

        return { error: null, data }

    } catch ( error ) { return { error, data: "Error" } }
}

export async function serverPut<T> ( endpoint: string, payload: T ) {
    try {
        const response = await fetch( SERVER_URL + endpoint, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( payload )
        } )

        const data = response.json()

        return { error: null, data }

    } catch ( error ) { return { error, data: "Error" } }
}


export async function serverDelete ( endpoint: string ) {
    try {
        await fetch( SERVER_URL + endpoint, { method: "DELETE" } )

        return { err: null, data: "sucess" }
    } catch ( error ) { throw error }
}