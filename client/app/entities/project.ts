import { z } from "zod";
import { UserSchema } from "./user";
import { WorkspaceSchema } from "./workspace";

export const ProjectSchema = z.object( {
    id: z.string().cuid2().nonempty(),
    project_name: z.string().nonempty().min( 4 ),
    workspace_id: WorkspaceSchema.pick( { id: true } ),
    creator_id: UserSchema.pick( { id: true } ),
    created_at: z.date().default( new Date ),
} )

export type ProjectType = z.infer<typeof ProjectSchema>