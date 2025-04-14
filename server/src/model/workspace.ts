import { MemberTable, WorkspaceTable } from "../drizzle/schema.ts"
import { db } from "../drizzle/db.ts"
import { eq } from "drizzle-orm"
import { UserInformation } from "./user.ts"

export type WorkspaceInformation = {
    workspaceId: string,
    workspaceName: string,
    creatorId: string,
}

export async function getWorkspace ( { workspaceId }: Pick<WorkspaceInformation, "workspaceId"> ) {
    const workspace = await db.query.WorkspaceTable.findFirst( {
        where: eq( WorkspaceTable.id, workspaceId )
    } )

    return { error: null, data: workspace }
}

export async function getUserWorkspaces ( { userId }: Pick<UserInformation, "userId"> ) {
    const userWorkspaces = await db.query.WorkspaceTable.findMany( {
        with: {
            memberIn: {
                where: eq( MemberTable.userId, userId )
            }
        }
    } )

    return { error: null, data: userWorkspaces }
}

export async function createWorkspace ( { workspaceName, creatorId }: Omit<WorkspaceInformation, "workspaceId"> ) {
    const workspace = await db.insert( WorkspaceTable )
        .values( { workspaceName, creatorId: creatorId } )
        .returning()

    return { error: null, data: workspace }
}

export async function updateWorkspace ( { workspaceId, workspaceName }: Omit<WorkspaceInformation, "creatorId"> ) {
    const workspace = await db.update( WorkspaceTable )
        .set( { workspaceName } )
        .where( eq( WorkspaceTable.id, workspaceId ) )
        .returning()

    return { error: null, data: workspace }
}

export async function deleteWorkspace ( { workspaceId }: Pick<WorkspaceInformation, "workspaceId"> ) {
    const ok = await db.delete( WorkspaceTable )
        .where( eq( WorkspaceTable.id, workspaceId ) )

    return { error: null, data: ok }
}
