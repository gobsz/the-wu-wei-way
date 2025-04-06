import express from "express";
import { loginRoute, usersRoute } from "./routes/user";

const app = express()
app.use( express.json() )

app.use( usersRoute )
app.use( loginRoute )

const PORT = 8080
app.listen( PORT, () => {
    console.log( `Running on ${PORT}` )
} )