import { ProjectTable } from "../drizzle/schema.ts"
import { db } from "../drizzle/db.ts"
import { eq } from "drizzle-orm"

export type ProjectInformation = {
    projectId: string,
    projectName: string,
    workspaceId: string,
    creatorId: string
}

export async function getProject ( { projectId }: Pick<ProjectInformation, "projectId"> ) {
    const project = await db.query.ProjectTable.findFirst( {
        where: eq( ProjectTable.id, projectId )
    } )

    return { error: null, data: project }
}

export async function getProjects ( { workspaceId }: Pick<ProjectInformation, "workspaceId"> ) {
    const projects = await db.query.ProjectTable.findMany( {
        where: eq( ProjectTable.workspaceId, workspaceId )
    } )

    return { error: null, data: projects }
}

export async function createProject ( { projectName, workspaceId, creatorId }: Omit<ProjectInformation, "projectId"> ) {
    const project = await db.insert( ProjectTable )
        .values( { projectName, creatorId, workspaceId } )
        .returning()

    return { error: null, data: project }
}

export async function updateProject ( { projectId, projectName }: Pick<ProjectInformation, "projectId" | "projectName"> ) {
    const project = await db.update( ProjectTable )
        .set( { projectName } )
        .where( eq( ProjectTable.id, projectId ) )
        .returning()

    return { error: null, data: project }
}

export async function deleteProject ( { projectId }: Pick<ProjectInformation, "projectId"> ) {
    const ok = await db.delete( ProjectTable )
        .where( eq( ProjectTable.id, projectId ) )

    return { error: null, data: ok }
}
