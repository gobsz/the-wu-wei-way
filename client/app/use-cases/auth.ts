import { serverDelete, serverPost } from "~/lib/fetchers";

export async function loginUser ( formData: FormData ) {
    const formObject = Object.fromEntries( formData.entries() );

    // ! VALIDATE INPUT ! //

    const response = await serverPost( "/login", formObject )

    // ! HANDLE "ERRORS" ! //

    return response
}

export async function signupUser ( formData: FormData ) {
    const formObject = Object.fromEntries( formData.entries() );

    // ! VALIDATE INPUT ! //

    const response = await serverPost( "/signup", formObject )

    // * NEW USER * //
    // * NEW PERSONAL WORKSPACE * //
    // ? TUTORIAL ? //

    // ! HANDLE "ERRORS" ! //

    return response
}

export async function logoutUser () {

    // TODO: CLEAR ACCESS TOKEN //

    const response = await serverDelete( "/logout" )

    // ! HANDLE ERRORS ! //

    return response
}