import { Request, Response } from "express"
import { User, users } from "../data/user"
import bcrypt from 'bcrypt'

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
