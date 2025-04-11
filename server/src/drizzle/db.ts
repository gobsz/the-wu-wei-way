import { drizzle } from 'drizzle-orm/node-postgres';
import { DATABASE_URL } from '../lib/constants.ts';
import * as schema from "./schema.ts"

export const db = drizzle( DATABASE_URL, { schema } );
