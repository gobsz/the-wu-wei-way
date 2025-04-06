import { postLogin, getToken, deleteToken } from "../model/auth"
import { Router } from "express"

export const loginRoute = Router()
export const tokenRoute = Router()

// * LOGIN ROUTE * // 
loginRoute.route( '/login' )
    .post( postLogin )


// * TOKEN ROUTE * //
tokenRoute.route( '/token' )
    .get( getToken )
    .delete( deleteToken )