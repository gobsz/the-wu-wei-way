import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../lib/constants"
import jwt from "jsonwebtoken"

export function generateAccessToken ( username: string ) {
    return jwt.sign( { username }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' } )
}

export function generateRefreshToken ( username: string ) {
    return jwt.sign( { username }, REFRESH_TOKEN_SECRET, { expiresIn: '30d' } )
}

export async function verifyAccessToken ( token: string ) {
    let user = null

    await jwt.verify( token, ACCESS_TOKEN_SECRET, ( error, token_user ) => {
        if ( error ) return { error: 403, data: "Error" }

        // TODO: GET USER BY TOKEN USER //

        user = token_user
        return
    } )

    return { error: null, data: user }
}

export async function verifyRefreshToken ( token: string ) {
    let accessToken = null;

    await jwt.verify( token, REFRESH_TOKEN_SECRET, ( error: any, token_user: any ) => {
        if ( error ) return { error: 403, data: "Forbidden" }
        // ! CHECK FOR REFRESH TOKEN IN CACHE OR DB //

        // TODO: CHECK FOR USER IN DATABASE
        const user = { username: "" }
        if ( !user ) return { error: 403, data: "Forbidden" }

        accessToken = generateAccessToken( user.username )
        return
    } )

    return { error: null, data: accessToken }
}