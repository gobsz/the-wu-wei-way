import { z } from "zod";

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
        await fetch( 'ENDPOINT', {
            body: { id: this.id, email }
        } )
        this.email = email
    }

    delete () {
        fetch( 'ENDPOINT', {
            body: this.id
        } )
    }
}