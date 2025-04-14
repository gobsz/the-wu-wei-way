import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../lib/constants.ts"
import { getUserByEmail } from "./user.ts"
import jwt from "jsonwebtoken"

export function generateAccessToken ( email: string ) {
    return jwt.sign( { email }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' } )
}


export function generateRefreshToken ( email: string ) {
    return jwt.sign( { email }, REFRESH_TOKEN_SECRET, { expiresIn: '30d' } )
}


export async function verifyAccessToken ( token: string ) {
    let user = null
    try {

        await jwt.verify( token, ACCESS_TOKEN_SECRET, async ( e, email: any ) => {
            if ( e ) return { error: 403, data: "Error" }

            const { error, data } = await getUserByEmail( { email } )
            if ( error || !data ) return { error: 403, data: "Forbidden" }

            user = data
            return
        } )

        return { error: null, data: user }

    } catch ( e ) { return { error: e, data: null } }
}


export async function verifyRefreshToken ( token: string ) {
    let accessToken = null;
    try {

        await jwt.verify( token, REFRESH_TOKEN_SECRET, async ( e, email: any ) => {
            if ( e ) return { error: 403, data: "Forbidden" }
            // ! CHECK FOR REFRESH TOKEN IN CACHE OR DB //

            const { error, data } = await getUserByEmail( { email } )
            if ( error || !data ) return { error: 403, data: "Forbidden" }

            accessToken = generateAccessToken( data.username )
            return
        } )

        return { error: null, data: accessToken }

    } catch ( e ) { return { error: e, data: null } }
}