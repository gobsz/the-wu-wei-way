import { postUsers } from "../model/user"
import { users } from "../data/user"
import { Router } from "express"

export const usersRoute = Router()

usersRoute.route( '/users' )
    .get( ( _, res ) => {
        res.status( 200 ).json( users )
    } )
    .post( postUsers )

