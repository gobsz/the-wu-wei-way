import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

// ! CREATE CLASS USER -> INSTATIATE WITH REQ.BODY.USER //

export function generateAccessToken ( user_email: string ) {
    return jwt.sign( user_email, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30m' } )
}

export function generateRefreshToken ( user_email: string ) {
    // ? HTTP ONLY TOKEN //
    return jwt.sign( user_email, process.env.REFRESH_TOKEN_SECRET as string )
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
