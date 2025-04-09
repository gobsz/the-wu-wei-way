import { serverPut } from "~/lib/server-fetch";
import z from "zod";

export const UserSchema = z.object( {
    id: z.string().cuid2().nonempty(),
    username: z.string().nonempty().min( 4 ).max( 24 ),
    email: z.string().nonempty(),
    created_at: z.date().default( new Date ),
    tier: z.enum( [ "FREE", "PREMIUM" ] )
} )

export type UserType = z.infer<typeof UserSchema>

/*
!       SERVER CLASS ONLY       !
! ACCESSED IN LOADERS / ACTIONS !
*/
class User {
    private id
    private username
    private email
    private createdAt
    private tier
    constructor ( user: UserType ) {
        this.id = user.id
        this.username = user.username
        this.email = user.email
        this.createdAt = user.created_at
        this.tier = user.tier
    }

    getID () { return this.id }
    getUsername () { return this.username }
    getEmail () { return this.email }
    getCreatedAtDate () { return this.createdAt }
    getTier () { return this.tier }

    // ! CHECK "THIS" KEYWORD OUTPUT ! //
    // ! VALIDATE INPUT ! //
    async setUsername ( newUsername: Pick<UserType, "username"> ) {
        const response = await serverPut( `/account/${this.id}/username`, { user: this, newUsername } )
        return response
    }

    async setEmail ( newEmail: Pick<UserType, "email"> ) {
        const response = await serverPut( `/account/${this.id}`, { user: this, newEmail } )
        return response
    }

    async changeTier ( newTier: Pick<UserType, "tier"> ) {
        // ! CHECK PAYMENT / EXPIRE DATE ! //
        const response = await serverPut( `/account/${this.id}`, { user: this, newTier } )
        return response
    }
}