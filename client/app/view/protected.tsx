export async function loader () {
    // ! AUTH //
    const response = await fetch( "http://localhost:8080/secret", {
        headers: {
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiIsImlhdCI6MTc0Mzk1OTU1OCwiZXhwIjoxNzQzOTYwNDU4fQ.Q7xd3cvzs0eh8TJhIfOX-kEJYYbnHacI1-lXXddXfeY`,
        },
    } )

    const result = await response.json()
}

export default function ProtectedPage () {
    return (
        <div>Protected</div>
    )
}
