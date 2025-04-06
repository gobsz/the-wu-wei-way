import { NextFunction, Request, Response } from "express"
import { User } from "../data/user"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

export const users: User[] = []

export async function postUsers ( req: Request, res: Response ) {
    try {
        const hashedPassword = await bcrypt.hash( req.body.password, 10 )

        const user = new User(
            req.body.name,
            hashedPassword
        )

        users.push( user )
        res.sendStatus( 201 )

    } catch ( e ) {
        res.sendStatus( 500 )
    }
}

export function authenticateToken (
    req: Request, res: Response, next: NextFunction
) {
    const authHeader = req.headers[ 'authorization' ]
    const token = authHeader && authHeader.split( ' ' )[ 1 ]

    if ( !token ) return res.sendStatus( 401 )

    jwt.verify( token, process.env.ACCESS_TOKEN_SECRET as string, ( error, user ) => {
        if ( error ) return res.sendStatus( 403 )
        // * req.user = user
        next()
    } )
}
