import { serverPut } from "~/lib/fetchers";
import z from "zod";

export const ClientUserSchema = z.object( {
    id: z.string().cuid2().nonempty(),
    username: z.string().nonempty().min( 4 ).max( 24 ),
    email: z.string().nonempty(),
    created_at: z.date().default( new Date ),
    tier: z.enum( [ "FREE", "PREMIUM" ] )
} )

export type ClientUserType = z.infer<typeof ClientUserSchema>

// ! CLIENT CLASS ! //
class User {
    private id
    private username
    private email
    private createdAt
    private tier
    constructor ( user: ClientUserType ) {
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
    // ! CHECK IF CLIENT OR SERVER SIDE CODE ! //
    // ! VALIDATE INPUT ! //
    async setUsername ( newUsername: Pick<ClientUserType, "username"> ) {
        const response = await serverPut( `/account/${this.id}/username`, { user: this, newUsername } )
        return response
    }

    async setEmail ( newEmail: Pick<ClientUserType, "email"> ) {
        const response = await serverPut( `/account/${this.id}`, { user: this, newEmail } )
        return response
    }

    async changeTier ( newTier: Pick<ClientUserType, "tier"> ) {
        // ! CHECK PAYMENT / EXPIRE DATE ! //
        const response = await serverPut( `/account/${this.id}`, { user: this, newTier } )
        return response
    }
}