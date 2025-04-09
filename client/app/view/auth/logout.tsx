export function loader () {
    fetch( 'logout', {
        method: "DELETE"
    } )
}

export default function LogoutPage () {
    return <div>You Logged Out</div>
}