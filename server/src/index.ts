import { authTokenMiddleware } from "./middleware/auth";
import { tokenRoute } from "./routes/token";
import { userRoute } from "./routes/user";
import cookieParser from 'cookie-parser'
import express from "express";

const app = express()
app.use( express.json() )
app.use( cookieParser() )

// * UNPROTECTED ROUTES * //
app.use( userRoute )
app.use( tokenRoute )

// * PROTECTED ROUTES EXAMPLE * //
app.get( '/secret', authTokenMiddleware, ( _, res ) => { res.json( { message: 'secret' } ) } )

const PORT = 8080
app.listen( PORT, () => {
    console.log( `Running on ${PORT}` )
} )