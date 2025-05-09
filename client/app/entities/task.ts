import { ProjectSchema } from "./project";
import { UserSchema } from "./user";
import { z } from "zod";

export const TaskSchema = z.object( {
    id: z.number().nonnegative(),
    task_name: z.string().nonempty().min( 4 ),
    project_id: ProjectSchema.pick( { id: true } ),
    creator_id: UserSchema.pick( { id: true } ),
    created_at: z.date().default( new Date ),
} )

export type TaskType = z.infer<typeof TaskSchema>

export class Task {
    // ! FINISH CLASS ! //
}

// ? CREATE CUSTOM FIELD ON DB TABLE ( HEADER ) --> CREATE CUSTOM FIELD IN TASK

export const TaskCustomFieldSchema = z.object( {
    id: z.number().nonnegative(),
    task_id: TaskSchema.pick( { id: true } ),
    field_name: z.string().nonempty().min( 4 ),
    field_value: z.any()
} )

export type TaskCustomField = z.infer<typeof TaskCustomFieldSchema>