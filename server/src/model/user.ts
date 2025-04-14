import { UserTable } from "../drizzle/schema.ts"
import { db } from "../drizzle/db.ts"
import { eq } from "drizzle-orm"

export const users = []

// ! CHECK FOR ERRORS / INVALIDATION ! //

export type UserInformation = {
    userId: string,
    username: string,
    hash: string,
    email: string
}

export async function getUser ( { userId }: Pick<UserInformation, "userId"> ) {
    const user = await db.query.UserTable.findFirst( {
        where: eq( UserTable.id, userId )
    } )

    return { error: null, data: user }
}

export async function createUser ( { username, hash, email }: Omit<UserInformation, "userId"> ) {
    const user = await db.insert( UserTable )
        .values( { username, email, hash } )
        .returning( { id: UserTable.id, username: UserTable.username } )

    return { error: null, data: user }
}

export async function updateUser ( { userId, username, hash, email }: UserInformation ) {
    const user = await db.update( UserTable )
        .set( { username, email, hash, } )
        .where( eq( UserTable.id, userId ) )
        .returning()

    return { error: null, data: user }
}

export async function deleteUser ( { userId }: Pick<UserInformation, "userId"> ) {
    const ok = await db.delete( UserTable )
        .where( eq( UserTable.id, userId ) )

    return { error: null, data: ok }
}
