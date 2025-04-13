import { UserTable } from "../drizzle/schema.ts"
import { db } from "../drizzle/db.ts"
import bcrypt from 'bcrypt'
import { eq } from "drizzle-orm"

export const users = []

// ! CHECK FOR ERRORS / INVALIDATION ! //

export async function getUser ( userId: string, columns?: Record<string, boolean> ) {
    const user = await db.query.UserTable.findFirst( {
        columns: columns,
        where: eq( UserTable.id, userId )
    } )

    return { error: null, data: user }
}

type UserInformationType = {
    username: string,
    hash: string,
    email: string
}

export async function createUser ( { username, hash, email }: UserInformationType ) {
    const user = await db.insert( UserTable )
        .values( { username, email, hash, } )
        .returning( { id: UserTable.id, username: UserTable.username } )

    return { error: null, data: user }
}

export async function updateUser ( { username, hash, email }: Partial<UserInformationType> ) {
    const userId = await db.update( UserTable )
        .set( { username, email, hash, } )
        .returning( { id: UserTable.id } )

    return { error: null, data: userId }
}

export async function deleteUser ( userId: string ) {
    const ok = await db.delete( UserTable )
        .where( eq( UserTable.id, userId ) )

    return { error: null, data: ok }
}
