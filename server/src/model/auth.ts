import { Request, Response } from "express"
import { REFRESH_TOKEN_SECRET } from "../lib/constants"
import { users } from "../data/user"
import jwt from "jsonwebtoken"

export function postLogin ( req: Request, res: Response ) {
    const user = users.find( user => user.name == req.body?.name )

    if ( !user ) { res.sendStatus( 401 ); return }

    try {
        if ( !user.compareHash( req.body.password ) ) res.sendStatus( 403 )

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        res.cookie( 'refreshToken', refreshToken, { httpOnly: true } ).json( { accessToken } )

    } catch ( e ) { res.status( 400 ).send( e ) }
}

export function getToken ( req: Request, res: Response ) {
    const refreshToken = req.cookies[ 'refreshToken' ]

    if ( !refreshToken ) { res.sendStatus( 401 ); return }

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
