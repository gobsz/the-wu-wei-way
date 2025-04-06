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

export async function postLogin ( req: Request, res: Response ) {
    const user = users.find( user => user.name == req.body.name )

    if ( !user ) {
        res.sendStatus( 401 )
        return
    }

    try {
        if ( await bcrypt.compare( req.body.password, user.getHash() ) ) {
            // TODO //
            const accessToken = user.generateAccessToken()
            const refreshToken = user.generateRefreshToken()
            res.send( 'success' )
        }

        else res.sendStatus( 400 )
    } catch ( e ) {
        res.status( 400 ).send( e )
    }
}

export function tokenPost ( req: Request, res: Response ) {
    const refreshToken = req.body.token

    if ( !refreshToken ) res.sendStatus( 401 )

    return jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        ( error: any, token_user: any ) => {

            if ( error ) res.sendStatus( 403 )
            // ! CHECK FOR REFRESH TOKEN IN CACHE OR DB //
            // ? CHECK IF USER IS NAME OR OBJECT //

            const user = users.find( user => user.name == token_user.name )
            if ( !user ) {
                res.sendStatus( 403 )
                return
            }

            res.json( { accessToken: user.generateAccessToken() } )

        } )
}

export function tokenDelete ( req: Request, res: Response ) {
    const refreshToken = req.body.token

    // TODO: DELETE TOKEN //

    res.sendStatus( 204 )
}

export function authenticateToken (
    req: Request, res: Response, next: NextFunction
) {
    // ! MIDDLEWARE //
    const authHeader = req.headers[ 'authorization' ]
    const token = authHeader && authHeader.split( ' ' )[ 1 ]

    if ( !token ) return res.sendStatus( 401 )

    jwt.verify( token, process.env.ACCESS_TOKEN_SECRET as string, ( error, user ) => {
        if ( error ) res.sendStatus( 403 )

        req = { ...req, user: user } as any
        next()
    } )
}
