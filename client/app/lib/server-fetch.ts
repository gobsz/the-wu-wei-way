import { SERVER_URL } from "./constants/env"

"SERVER ENDPOINT FETCH"

export async function serverGet ( endpoint: string, token: string ) {
    // ! GET TOKEN AUTOMATICALLY ! //
    try {
        const response = await fetch( SERVER_URL + endpoint, {
            headers: { "Authorization": `Bearer ${token}` },
        } )

        const data = response.json()

        return { error: null, data }

    } catch ( error ) { return { error, data: "Error" } }
}

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

        return { error: null, data: "sucess" }
    } catch ( error ) { return { error, data: "Something went wrogn" } }
}