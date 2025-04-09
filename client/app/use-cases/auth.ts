import { serverDelete, serverPost } from "~/lib/server-fetch";

export async function loginUser ( formData: FormData ) {
    const formObject = Object.fromEntries( formData.entries() );

    // ! VALIDATE INPUT ! //

    const { error, data } = await serverPost( "/login", formObject )

    // ! HANDLE "ERRORS" ! //

    return data
}

export async function signupUser ( formData: FormData ) {
    const formObject = Object.fromEntries( formData.entries() );

    // ! VALIDATE INPUT ! //

    const { error, data } = await serverPost( "/signup", formObject )

    // * NEW USER * //
    // * NEW PERSONAL WORKSPACE * //
    // ? TUTORIAL ? //

    // ! HANDLE "ERRORS" ! //

    return data
}

export async function logoutUser () {

    // TODO: CLEAR ACCESS TOKEN //

    const { error, data } = await serverDelete( "/token" )

    // ! HANDLE ERRORS ! //

    return data
}