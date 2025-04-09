import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../data/token";

export function authTokenMiddleware ( req: Request, res: Response, next: NextFunction ) {
    const authHeader = req.headers[ 'authorization' ]
    const token = authHeader && authHeader.split( ' ' )[ 1 ]

    if ( !token ) { res.status( 307 ).redirect( '/token' ); return }

    const user = verifyAccessToken( token )
    req = { ...req, user: user } as any

    return next()
}