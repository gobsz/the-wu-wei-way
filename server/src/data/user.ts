import jwt from "jsonwebtoken"

export class User {
    public name
    private hash
    constructor ( name: string, hash: string ) {
        this.name = name
        this.hash = hash
    }

    getHash () {
        return this.hash
    }

    generateAccessToken () {
        return jwt.sign( this.name, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30m' } )
    }

    generateRefreshToken () {
        // TODO HTTP ONLY TOKEN //
        return jwt.sign( this.name, process.env.REFRESH_TOKEN_SECRET as string )
    }
}