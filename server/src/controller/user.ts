import { generateAccessToken, generateRefreshToken } from "../model/token.ts"
import { Request, Response } from "express"
import { createUser } from "../model/user.ts"
import { compareHash, createHash } from "../lib/bcrypt.ts";


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

export async function postSignup ( req: Request, res: Response ) {
    const { username, password, email } = req.body // ! PARSE INFORMATION ! //

    const { data: user } = await createUser( {
        username, email, hash: createHash( password )
    } )

    try {
        const accessToken = generateAccessToken( user[ 0 ].username )
        const refreshToken = generateRefreshToken( user[ 0 ].username )

        res.cookie( 'refreshToken', refreshToken, { httpOnly: true } ).json( { accessToken } )
        res.status( 200 ).send( "SIGNED UP" )

    } catch ( e ) { res.status( 400 ).send( e ) }
}