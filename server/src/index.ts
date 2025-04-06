import { usersRoute } from "./routes/user";
import { loginRoute, tokenRoute, } from "./routes/auth";
import { authTokenMiddleware } from "./middleware/auth";
import cookieParser from 'cookie-parser'
import express from "express";

const app = express()
app.use( express.json() )
app.use( cookieParser() )

// * UNPROTECTED ROUTES * //
app.use( usersRoute )
app.use( loginRoute )
app.use( tokenRoute )

// * PROTECTED ROUTES * //
app.get( '/secret', authTokenMiddleware, ( _, res ) => { res.json( { message: 'secret' } ) } )

const PORT = 8080
app.listen( PORT, () => {
    console.log( `Running on ${PORT}` )
} )