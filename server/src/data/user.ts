import { Request } from "express"
import bcrypt from 'bcrypt'

export const users = []

export function createUser ( req: Request ) {
    const { username, password } = req.body
    const hash = bcrypt.hashSync( password, 10 )

    // TODO: ADD TO DATABASE //

    return { username, hash }
}

export function compareHash ( password: string, hash: string ) {
    return bcrypt.compareSync( password, hash )
}