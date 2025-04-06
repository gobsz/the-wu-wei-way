import { NextFunction, Request, Response } from "express"
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../lib/constants"
import { users } from "../data/user"
import jwt from "jsonwebtoken"

export function postLogin ( req: Request, res: Response ) {
    const user = users.find( user => user.name == req.body?.name )

    if ( !user ) {
        res.sendStatus( 401 )
        return
    }

    try {
        if ( !user.compareHash( req.body.password ) ) res.sendStatus( 403 )

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        res.cookie( 'refreshToken', refreshToken, { httpOnly: true } ).json( { accessToken } )

    } catch ( e ) {
        console.log( e )
        res.status( 400 ).send( e )
    }
}

export function getToken ( req: Request, res: Response ) {
    const refreshToken = req.cookies[ 'refreshToken' ]

    if ( !refreshToken ) {
        // ! REDIRECT TO LOGIN PAGE //
        res.status( 401 ).send( 'Log In Again' )
        return
    }

    return jwt.verify( refreshToken, REFRESH_TOKEN_SECRET, ( error: any, token_user: any ) => {

        if ( error ) res.sendStatus( 403 )
        // ! CHECK FOR REFRESH TOKEN IN CACHE OR DB //

        const user = users.find( user => user.name == token_user.name )
        if ( !user ) res.sendStatus( 403 )

        res.json( { accessToken: user?.generateAccessToken() } )
    } )
}

export function deleteToken ( _: Request, res: Response ) {
    res.clearCookie( 'refreshToken', { httpOnly: true } ).sendStatus( 204 )
    // TODO: DELETE TOKEN FROM DB //
    return
}

export function authTokenMiddleware (
    req: Request, res: Response, next: NextFunction
) {
    const authHeader = req.headers[ 'authorization' ]
    const token = authHeader && authHeader.split( ' ' )[ 1 ]

    if ( !token ) {
        res.status( 307 ).redirect( '/token' )
        return
    }

    jwt.verify( token, ACCESS_TOKEN_SECRET, ( error, user ) => {
        if ( error ) {
            res.status( 307 ).redirect( '/token' )
            return
        }

        req = { ...req, user: user } as any
        next()
    } )
}