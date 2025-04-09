import { UserSchema } from "./user";
import { z } from "zod";

export const WorkspaceSchema = z.object( {
    id: z.string().cuid2().nonempty(),
    workspace_name: z.string().nonempty().min( 4 ).max( 24 ),
    creator_id: UserSchema.pick( { id: true } ),
} )

export type WorkspaceType = z.infer<typeof WorkspaceSchema>

/*
!       SERVER CLASS ONLY       !
! ACCESSED IN LOADERS / ACTIONS !
*/
class Workspace {
    private id
    private workspaceName
    private creatorId
    constructor ( workspace: WorkspaceType ) {
        this.id = workspace.id
        this.workspaceName = workspace.workspace_name
        this.creatorId = workspace.creator_id
    }

    getID () { return this.id }
    getWorkspaceName () { return this.workspaceName }
    getCreator () { return this.creatorId } // TODO: RETURN CREATOR INFO //
}