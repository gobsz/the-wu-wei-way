import { pgTable, uuid, varchar, date, pgEnum, unique, primaryKey } from "drizzle-orm/pg-core";


// * USER * //
export const userTier = pgEnum( "user_tier", [ "FREE", "PREMIUM" ] )

export const UserTable = pgTable( 'user', {
    id: uuid( "id" ).primaryKey().defaultRandom(),
    email: varchar( "email", { length: 255 } ).unique().notNull(),
    username: varchar( "username", { length: 255 } ).notNull(),
    createdAt: date( "created_at" ).defaultNow(),
    tier: userTier( "user_tier" ).default( "FREE" )
} )


// * WORKSPACE * //
export const WorkspaceTable = pgTable( 'workspace', {
    id: uuid( "id" ).primaryKey().defaultRandom(),
    workspaceName: varchar( "workspace_name", { length: 255 } ).notNull(),
    creatorId: uuid( "creator_id" ).references( () => UserTable.id ).notNull()
} )


// * PROJECT * //
export const ProjectTable = pgTable( 'project', {
    id: uuid( "id" ).primaryKey().defaultRandom(),
    proejctName: varchar( "project_name", { length: 255 } ).notNull(),
    workspaceId: uuid( "workspace_id" ).references( () => WorkspaceTable.id ).notNull(),
    creatorId: uuid( "creator_id" ).references( () => UserTable.id ).notNull(),
    createdAt: date( "created_at" ).defaultNow()
} )


// * MEMBER * //
export const memberRole = pgEnum( "member_role", [ "MEMBER", "MODERATOR", "ADMIN" ] )

export const memberTable = pgTable( 'member', {
    userId: uuid( "user_id" ).references( () => UserTable.id ).notNull(),
    workspaceId: uuid( "workspace_id" ).references( () => WorkspaceTable.id ).notNull(),
    role: memberRole( "member_role" ).default( "MEMBER" )
}, table => {
    return [
        primaryKey( {
            name: "user_and_workspace",
            columns: [ table.userId, table.workspaceId ]
        } )
    ]
} )