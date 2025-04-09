import { getToken, deleteToken } from "../controller/token"
import { Router } from "express"

export const tokenRoute = Router()

// * TOKEN ROUTE * //
tokenRoute.route( '/token' )
    .get( getToken )
    .delete( deleteToken )