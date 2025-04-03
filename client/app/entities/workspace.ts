import { z } from "zod";
import { UserSchema } from "./user";

export const WorkspaceSchema = z.object( {
    id: z.string().cuid2().nonempty(),
    workspace_name: z.string().nonempty().min( 4 ).max( 24 ),
    creator_id: UserSchema.pick( { id: true } ),
    isPersonalWorkspace: z.boolean()
} )

export type WorkspaceType = z.infer<typeof WorkspaceSchema>