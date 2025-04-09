import { ClientUserSchema } from "./user";
import { z } from "zod";

export const WorkspaceSchema = z.object( {
    id: z.string().cuid2().nonempty(),
    workspace_name: z.string().nonempty().min( 4 ).max( 24 ),
    creator_id: ClientUserSchema.pick( { id: true } ),
} )

export type WorkspaceType = z.infer<typeof WorkspaceSchema>