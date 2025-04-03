import { z } from "zod";
import { UserSchema } from "./user";
import { WorkspaceSchema } from "./workspace";

export const MemberSchema = z.object( {
    id: z.number().nonnegative(),
    user_id: UserSchema.pick( { id: true } ),
    workspace_id: WorkspaceSchema.pick( { id: true } ),
    role: z.enum( [ "ADMIN", "MODERATOR", "EDITOR" ] )
} )

export type MemberType = z.infer<typeof MemberSchema>