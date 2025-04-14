import { pgTable, uuid, varchar, date, pgEnum, unique, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


// * USER * //
export const userTier = pgEnum( "user_tier", [ "FREE", "PREMIUM" ] )

export const UserTable = pgTable( 'user', {
    id: uuid( "id" ).primaryKey().defaultRandom(),
    email: varchar( "email", { length: 255 } ).unique().notNull(),
    username: varchar( "username", { length: 255 } ).notNull(),
    hash: varchar( "hash", { length: 255 } ).notNull(),
    createdAt: date( "created_at" ).defaultNow(),
    tier: userTier( "user_tier" ).default( "FREE" )
}, table => {
    return [ unique( "email" ).on( table.email ) ]
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
    projectName: varchar( "project_name", { length: 255 } ).notNull(),
    workspaceId: uuid( "workspace_id" ).references( () => WorkspaceTable.id ).notNull(),
    creatorId: uuid( "creator_id" ).references( () => UserTable.id ).notNull(),
    createdAt: date( "created_at" ).defaultNow()
} )


// * MEMBER * //
export const MemberRole = pgEnum( "member_role", [ "MEMBER", "MODERATOR", "ADMIN" ] )

export const MemberTable = pgTable( 'member', {
    userId: uuid( "user_id" ).references( () => UserTable.id ).notNull(),
    workspaceId: uuid( "workspace_id" ).references( () => WorkspaceTable.id ).notNull(),
    role: MemberRole( "member_role" ).default( "MEMBER" )
}, table => {
    return [
        primaryKey( {
            name: "user_and_workspace",
            columns: [ table.userId, table.workspaceId ]
        } )
    ]
} )


// * TASK * //
export const TaskTable = pgTable( 'member', {
    id: uuid( "id" ).primaryKey().defaultRandom(),
    projectId: uuid( "workspace_id" ).references( () => ProjectTable.id ).notNull(),
    taskTitle: varchar( "task_title", { length: 255 } ).notNull(),
    taskDescription: varchar( "task_description", { length: 2047 } ),
    creatorId: uuid( "creator_id" ).references( () => UserTable.id ).notNull(),
    assigneeId: uuid( "assignee_id" ).references( () => UserTable.id ).notNull(),
    deadline: date( "deadline" ).$type<Date | null>()
} )

// ! RELATIONS ! //
export const UserTableRelations = relations( UserTable, ( { many } ) => {
    return {
        workspaces: many( WorkspaceTable ),
        projects: many( ProjectTable ),
        memberOf: many( MemberTable ),
        tasksCreated: many( TaskTable ),
        tasksAssigned: many( TaskTable )
    }
} )

export const WorkspaceTableRelations = relations( WorkspaceTable, ( { one, many } ) => {
    return {
        creatorId: one( UserTable, {
            fields: [ WorkspaceTable.creatorId ],
            references: [ UserTable.id ]
        } ),
        projects: many( ProjectTable ),
        memberIn: many( MemberTable ),
    }
} )

export const ProjectTableRelations = relations( ProjectTable, ( { one } ) => {
    return {
        creatorId: one( UserTable, {
            fields: [ ProjectTable.creatorId ],
            references: [ UserTable.id ]
        } ),
        workspaceId: one( WorkspaceTable, {
            fields: [ ProjectTable.workspaceId ],
            references: [ WorkspaceTable.id ]
        } ),
    }
} )

export const MemberTableRelations = relations( MemberTable, ( { one } ) => {
    return {
        userId: one( UserTable, {
            fields: [ MemberTable.userId ],
            references: [ UserTable.id ]
        } ),
        workspaceId: one( WorkspaceTable, {
            fields: [ MemberTable.workspaceId ],
            references: [ WorkspaceTable.id ]
        } ),
    }
} )

export const TaskTableRelations = relations( TaskTable, ( { one } ) => {
    return {
        projectId: one( ProjectTable, {
            fields: [ TaskTable.projectId ],
            references: [ ProjectTable.id ]
        } ),
        creatorId: one( UserTable, {
            fields: [ TaskTable.creatorId ],
            references: [ UserTable.id ]
        } ),
        assigneeId: one( UserTable, {
            fields: [ TaskTable.assigneeId ],
            references: [ UserTable.id ]
        } ),
    }
} )