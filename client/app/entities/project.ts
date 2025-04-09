import { WorkspaceSchema } from "./workspace";
import { UserSchema } from "./user";
import { z } from "zod";

export const ProjectSchema = z.object( {
    id: z.string().cuid2().nonempty(),
    project_name: z.string().nonempty().min( 4 ),
    workspace_id: WorkspaceSchema.pick( { id: true } ),
    creator_id: UserSchema.pick( { id: true } ),
    created_at: z.date().default( new Date ),
} )

export type ProjectType = z.infer<typeof ProjectSchema>

/*
!       SERVER CLASS ONLY       !
! ACCESSED IN LOADERS / ACTIONS !
*/
class Project {
    private id
    private projectName
    private workspaceId
    private creatorId
    private createdAt
    constructor ( project: ProjectType ) {
        this.id = project.id
        this.projectName = project.project_name
        this.workspaceId = project.workspace_id
        this.creatorId = project.creator_id
        this.createdAt = project.created_at
    }

    getID () { return this.id }
    getWorkspaceID () { return this.workspaceId }
    getCreator () { return this.creatorId } // TODO: RETURN CREATOR INFO //
    getProjectName () { return this.projectName }
    getCreatedAt () { return this.createdAt }
}