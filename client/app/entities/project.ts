import { WorkspaceSchema } from "./workspace";
import { ClientUserSchema } from "./user";
import { z } from "zod";

export const ProjectSchema = z.object( {
    id: z.string().cuid2().nonempty(),
    project_name: z.string().nonempty().min( 4 ),
    workspace_id: WorkspaceSchema.pick( { id: true } ),
    creator_id: ClientUserSchema.pick( { id: true } ),
    created_at: z.date().default( new Date ),
} )

export type ProjectType = z.infer<typeof ProjectSchema>