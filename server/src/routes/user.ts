import { postLogin, postSignup } from "../controller/user"
import { users } from "../data/user"
import { Router } from "express"

export const userRoute = Router()

// * LOGIN ROUTE * // 
userRoute.route( '/login' )
    .post( postLogin )

// * SIGNUP ROUTE * // 
userRoute.route( '/signup' )
    .post( postSignup )

// * USERS ROUTE * //
userRoute.route( '/users' )
    .get( ( _, res ) => {
        res.status( 200 ).json( users )
    } )
