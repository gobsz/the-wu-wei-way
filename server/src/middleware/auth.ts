import { Request, Response, NextFunction } from "express";
import { ACCESS_TOKEN_SECRET } from "../lib/constants";
import jwt from "jsonwebtoken"

export function authTokenMiddleware (
    req: Request, res: Response, next: NextFunction
) {
    const authHeader = req.headers[ 'authorization' ]
    const token = authHeader && authHeader.split( ' ' )[ 1 ]

    if ( !token ) { res.status( 307 ).redirect( '/token' ); return }

    jwt.verify( token, ACCESS_TOKEN_SECRET, ( error, user ) => {
        if ( error ) { res.status( 307 ).redirect( '/token' ); return }

        req = { ...req, user: user } as any
        next()
    } )
}