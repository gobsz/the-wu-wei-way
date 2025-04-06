import { SERVER_URL } from "~/lib/constants";

export async function loginUser ( formData: FormData ) {
    const formObject = Object.fromEntries( formData.entries() );

    // ! VALIDATE INPUT ! //

    const response = await fetch( SERVER_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( formObject )
    } )

    // ! HANDLE ERRORS ! //

    return response
}

export async function signinUser ( formData: FormData ) {
    const formObject = Object.fromEntries( formData.entries() );

    // ! VALIDATE INPUT ! //

    const response = await fetch( SERVER_URL + "/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( formObject )
    } )

    // ! HANDLE ERRORS ! //

    return response
}

export async function logoutUser () {

    // TODO: CLEAR ACCESS TOKEN // 

    const response = await fetch( SERVER_URL + "/logout", { method: "DELETE" } )

    // ! HANDLE ERRORS ! //

    return response
}