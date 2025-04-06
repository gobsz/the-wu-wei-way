import { Request, Response, Router } from "express";
import { User } from "../data/user";
import jwt from "jsonwebtoken"

const auth = Router()

// ! FIX TYPESCRIPT //

auth.post( '/token', ( req: Request, res: Response ) => {
    const refreshToken = req.body.token

    if ( !refreshToken ) return res.sendStatus( 401 )
    // * CHECK FOR REFRESH TOKEN IN CACHE / DB //

    jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET as string, ( error: Error, user: User ) => {
        if ( error ) res.sendStatus( 403 )

        const accessToken = user.generateAccessToken()
        res.json( { accessToken: accessToken } )
    } )
} )

auth.delete( '/logout', ( req: Request, res: Response ) => {
    const refreshToken = req.body.token

    // * DELETE TOKEN //

    res.sendStatus( 204 )
} )
