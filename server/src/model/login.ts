import { Request, Response } from "express"
import { users } from "./user"
import bcrypt from 'bcrypt'

export async function postLogin ( req: Request, res: Response ) {
    const user = users.find( user => user.name == req.body.name )
    if ( !user ) {
        res.sendStatus( 401 )
        return
    }

    try {
        if ( await bcrypt.compare( req.body.password, user.getHash() ) ) res.send( 'success' )
        else res.sendStatus( 400 )
        return
    } catch ( e ) {
        res.status( 400 ).send( e )
    }
}