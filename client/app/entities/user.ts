import { z } from "zod";

export const UserSchema = z.object( {
    id: z.string().cuid2().nonempty(),
    username: z.string().nonempty().min( 4 ).max( 24 ),
    email: z.string().nonempty(),
    hash: z.string().nonempty().min( 6 ).max( 32 ),
    created_at: z.date().default( new Date ),
    tier: z.enum( [ "FREE", "PREMIUM" ] )
} )

export type User = z.infer<typeof UserSchema>