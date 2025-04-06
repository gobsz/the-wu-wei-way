import { postLogin, postUsers, tokenDelete, tokenPost, users } from "../model/user"
import { Router } from "express"


export const usersRoute = Router()

usersRoute.route( '/users' )
    .get( ( _, res ) => {
        res.status( 200 ).json( users )
    } )
    .post( postUsers )


export const loginRoute = Router()

loginRoute.route( '/users/login' )
    .post( postLogin )

export const token = Router()

token.route( 'token' )
    .post( tokenPost )
    .delete( tokenDelete )
