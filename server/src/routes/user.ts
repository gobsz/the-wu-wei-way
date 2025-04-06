import { Router } from "express"
import { postUsers, users } from "../model/user"
import { postLogin } from "../model/login"

export const usersRoute = Router()

usersRoute.route( '/users' )
    .get( ( _, res ) => {
        res.status( 200 ).json( users )
    } )
    .post( postUsers )


export const loginRoute = Router()

loginRoute.route( '/users/login' )
    .post( postLogin )
