import { defineConfig } from "drizzle-kit"
import { DATABASE_URL } from "./src/lib/constants.ts"

export default defineConfig( {
    schema: "./src/drizzle/schema.ts",
    out: "./src/drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: { url: DATABASE_URL },
    strict: true
} )