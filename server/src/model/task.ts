import { TaskTable } from "../drizzle/schema.ts"
import { db } from "../drizzle/db.ts"
import { eq } from "drizzle-orm"

type TaskInformation = {
    taskId: string,
    projectId: string,
    taskTitle: string,
    taskDescription: string,
    creatorId: string,
    assigneeId: string,
    deadline: Date
}

export async function getTask ( { taskId }: Pick<TaskInformation, "taskId"> ) {
    const project = await db.query.TaskTable.findFirst( {
        where: eq( TaskTable.id, taskId )
    } )

    return { error: null, data: project }
}

export async function getTasks ( { projectId }: Pick<TaskInformation, "projectId"> ) {
    const tasks = await db.query.TaskTable.findMany( {
        where: eq( TaskTable.projectId, projectId )
    } )

    return { error: null, data: tasks }
}

export async function createTask ( taskObject: Omit<TaskInformation, "taskId"> ) {
    const workspace = await db.insert( TaskTable )
        .values( taskObject )
        .returning()

    return { error: null, data: workspace }
}

export async function updateTask ( {
    taskId, taskTitle, taskDescription, assigneeId, deadline
}: Omit<TaskInformation, "projectId" | "creatorId"> ) {

    const project = await db.update( TaskTable )
        .set( { taskTitle, taskDescription, assigneeId, deadline } )
        .where( eq( TaskTable.id, taskId ) )
        .returning()

    return { error: null, data: project }
}

export async function deleteTask ( { taskId }: Pick<TaskInformation, "taskId"> ) {
    const ok = await db.delete( TaskTable )
        .where( eq( TaskTable.id, taskId ) )

    return { error: null, data: ok }
}
