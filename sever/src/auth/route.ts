import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken"
import { generateAccessToken } from "./token";

const auth = Router()

// ! FIX TYPESCRIPT //

auth.post( '/token', ( req: Request, res: Response ) => {
    const refreshToken = req.body.token

    if ( !refreshToken ) return res.sendStatus( 401 )
    // * CHECK FOR REFRESH TOKEN IN CACHE / DB //

    jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET as string, ( error, user ) => {
        if ( error ) res.sendStatus( 403 )

        const accessToken = generateAccessToken( { name: user.name } )
        res.json( { accessToken: accessToken } )
    } )
} )

auth.delete( '/logout', ( req: Request, res: Response ) => {
    const refreshToken = req.body.token

    // * DELETE TOKEN //

    res.sendStatus( 204 )
} )
