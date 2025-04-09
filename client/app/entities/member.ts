import { WorkspaceSchema } from "./workspace";
import { UserSchema } from "./user";
import { z } from "zod";

export const MemberSchema = z.object( {
    // * UNIQUE COMBINATION * //
    user_id: UserSchema.pick( { id: true } ),
    workspace_id: WorkspaceSchema.pick( { id: true } ),
    role: z.enum( [ "ADMIN", "MODERATOR", "MEMBER" ] )
} )

export type MemberType = z.infer<typeof MemberSchema>

/*
!       SERVER CLASS ONLY       !
! ACCESSED IN LOADERS / ACTIONS !
*/
class Member {
    private userId
    private workspaceId
    private role
    constructor ( member: MemberType ) {
        this.userId = member.user_id
        this.workspaceId = member.workspace_id
        this.role = member.role
    }

    getUserID () { return this.userId }
    getWorkspaceID () { return this.workspaceId }
    getRole () { return this.role }
}