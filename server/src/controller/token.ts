import { verifyRefreshToken } from "../data/token"
import { Request, Response } from "express"

export async function getToken ( req: Request, res: Response ) {
    const refreshToken = req.cookies[ 'refreshToken' ]

    if ( !refreshToken ) { res.sendStatus( 401 ); return }

    const { error, data } = await verifyRefreshToken( refreshToken )
    if ( error ) throw error

    res.status( 200 ).send( data )
    return
}

export function deleteToken ( _: Request, res: Response ) {
    res.clearCookie( 'refreshToken', { httpOnly: true } ).sendStatus( 204 )
    // TODO: DELETE TOKEN FROM DB //
    return
}
