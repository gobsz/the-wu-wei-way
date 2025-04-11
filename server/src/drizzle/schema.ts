import { pgTable, uuid, varchar, date } from "drizzle-orm/pg-core";

export const UserTable = pgTable( 'user', {
    id: uuid( "id" ).primaryKey().defaultRandom(),
    email: varchar( "email", { length: 255 } ).unique().notNull(),
    username: varchar( "username", { length: 255 } ).notNull(),
    createdAt: date( "created_at" ).defaultNow(),
    tier: varchar( "tier", { length: 24 } ).default( "FREE" )
} )

// ! FIX RELATIONS ! //

export const WorkspaceTable = pgTable( 'workspace', {
    id: uuid( "id" ).primaryKey().defaultRandom(),
    workspaceName: varchar( "workspace_name", { length: 255 } ).notNull(),
    creatorId: UserTable.id( "creator_id" )
} )

export const ProjectTable = pgTable( 'project', {
    id: uuid( "id" ).primaryKey().defaultRandom(),
    proejctName: varchar( "project_name", { length: 255 } ).notNull(),
    workspaceId: WorkspaceTable.id( "workspace_id" ).notNull(),
    creatorId: UserTable.id( "creator_id" ).notNull(),
    createdAt: date( "created_at" ).defaultNow()
} )

export const memberTable = pgTable( 'member', {
    userId: UserTable.id( "user_id" ).notNull(),
    workspaceId: WorkspaceTable.id( "workspace_id" ).notNull(),
    role: varchar( "member_role", { length: 255 } ).notNull()
} )