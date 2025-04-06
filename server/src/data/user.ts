import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../lib/constants"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

export class User {
    public name
    private hash
    constructor ( name: string, password: string ) {
        this.name = name
        try {
            this.hash = bcrypt.hashSync( password, 10 )
        } catch ( error ) {
            // ! HANDLE ERROR //
            throw error
        }
    }

    compareHash ( password: string ) {
        return bcrypt.compareSync( password, this.hash )
    }

    generateAccessToken () {
        return jwt.sign( { name: this.name }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' } )
    }

    generateRefreshToken () {
        // TODO HTTP ONLY TOKEN //
        return jwt.sign( { name: this.name }, REFRESH_TOKEN_SECRET, { expiresIn: '30d' } )
    }
}

export const users: User[] = []

users.push( new User( 'John', 'Connor' ) )