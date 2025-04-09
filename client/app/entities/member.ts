import { z } from "zod";
import { ClientUserSchema } from "./user";
import { WorkspaceSchema } from "./workspace";

export const MemberSchema = z.object( {
    // * UNIQUE COMBINATION * //
    user_id: ClientUserSchema.pick( { id: true } ),
    workspace_id: WorkspaceSchema.pick( { id: true } ),
    role: z.enum( [ "ADMIN", "MODERATOR", "MEMBER" ] )
} )

export type MemberType = z.infer<typeof MemberSchema>