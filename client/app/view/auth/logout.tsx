import { redirect } from "react-router"

export function loader () {
    /*
    fetch( 'logout', {
        method: "DELETE"
    } )
        */
}

export default function LogoutPage () {
    return <h2>You Logged Out</h2>
    //redirect( '/login?toast="YouLoggedOut"' ) // TODO: TOAST //
}