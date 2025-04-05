import { z, ZodString } from "zod";
import { useFetch } from "~/lib/hooks/use-fetch";

export const UserSchema = z.object( {
    id: z.string().cuid2().nonempty(),
    username: z.string().nonempty().min( 4 ).max( 24 ),
    email: z.string().nonempty(),
    hash: z.string().nonempty().min( 6 ).max( 32 ),
    created_at: z.date().default( new Date ),
    tier: z.enum( [ "FREE", "PREMIUM" ] )
} )

export type UserType = z.infer<typeof UserSchema>

// ! COMPLETE CLASS //

class User {
    private id
    private email
    constructor ( user: UserType ) {
        this.id = user.id
        this.email = user.email
    }

    getID () {
        return this.id
    }

    getEmail () {
        return this.email
    }

    async setEmail ( email: string ) { // * CHANGE TO EMAIL TYPE
        const { data, loading, fetchError } = useFetch( 'ENDPOINT', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { id: this.id, email } )
        } )

        if ( fetchError ) throw fetchError

        if ( data == null ) return 'Operation Cancelled'

        this.email = email
        return data
    }

    delete () {
        const { data, loading, fetchError } = useFetch( 'ENDPOINT', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { id: this.id } )
        } )
    }
}