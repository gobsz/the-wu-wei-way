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
    try {

        const project = await db.query.TaskTable.findFirst( {
            where: eq( TaskTable.id, taskId )
        } )

        return { error: null, data: project }

    } catch ( e ) { return { error: e, data: null } }
}


export async function getTasks ( { projectId }: Pick<TaskInformation, "projectId"> ) {
    try {

        const tasks = await db.query.TaskTable.findMany( {
            where: eq( TaskTable.projectId, projectId )
        } )

        return { error: null, data: tasks }

    } catch ( e ) { return { error: e, data: null } }
}


export async function createTask ( taskObject: Omit<TaskInformation, "taskId"> ) {
    try {

        const workspace = await db.insert( TaskTable )
            .values( taskObject )
            .returning()

        return { error: null, data: workspace }

    } catch ( e ) { return { error: e, data: null } }
}


export async function updateTask ( {
    taskId, taskTitle, taskDescription, assigneeId, deadline
}: Omit<TaskInformation, "projectId" | "creatorId"> ) {
    try {

        const project = await db.update( TaskTable )
            .set( { taskTitle, taskDescription, assigneeId, deadline } )
            .where( eq( TaskTable.id, taskId ) )
            .returning()

        return { error: null, data: project }

    } catch ( e ) { return { error: e, data: null } }
}


export async function deleteTask ( { taskId }: Pick<TaskInformation, "taskId"> ) {
    try {
        await db.delete( TaskTable )
            .where( eq( TaskTable.id, taskId ) )

        return { error: null, data: true }

    } catch ( e ) { return { error: e, data: null } }
}
