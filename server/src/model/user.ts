import { Request, Response } from "express"
import { User, users } from "../data/user"

export function postUsers ( req: Request, res: Response ) {

    const user = new User(
        req.body.name,
        req.body.password
    )

    // * DB * //
    users.push( user )

    res.sendStatus( 201 )
}
