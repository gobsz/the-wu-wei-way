import { generateAccessToken, generateRefreshToken } from "../data/token"
import { createUser, compareHash } from "../data/user"
import { Request, Response } from "express"

export function postLogin ( req: Request, res: Response ) {
    // TODO: GET USER FROM DB //
    const user = { username: "", hash: "" }

    if ( !user ) { res.sendStatus( 401 ); return }

    try {
        if ( !compareHash( req.body.password, user.hash ) ) res.status( 403 ).send( "FORBIDDEN" )

        const accessToken = generateAccessToken( user.username )
        const refreshToken = generateRefreshToken( user.username )

        res.cookie( 'refreshToken', refreshToken, { httpOnly: true } ).json( { accessToken } )
        res.status( 200 ).send( "LOCKED IN" )

    } catch ( e ) { res.status( 400 ).send( e ) }
}

export function postSignup ( req: Request, res: Response ) {
    const user = createUser( req )

    try {
        const accessToken = generateAccessToken( user.username )
        const refreshToken = generateRefreshToken( user.username )

        res.cookie( 'refreshToken', refreshToken, { httpOnly: true } ).json( { accessToken } )
        res.status( 200 ).send( "SIGNED UP" )

    } catch ( e ) { res.status( 400 ).send( e ) }
}