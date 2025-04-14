import { MemberTable } from "../drizzle/schema.ts"
import { db } from "../drizzle/db.ts"
import { and, eq } from "drizzle-orm"
import { WorkspaceInformation } from "./workspace.ts"
import { UserInformation } from "./user.ts"

type RoleType = "ADMIN" | "MODERATOR" | "MEMBER"

export type MemberInformation = {
    userId: string,
    workspaceId: string,
    role: RoleType
}

export async function getMembers ( { workspaceId }: Pick<MemberInformation, "workspaceId"> ) {
    try {

        const members = await db.query.MemberTable.findMany( {
            where: eq( MemberTable.workspaceId, workspaceId )
        } )

        return { error: null, data: members }

    } catch ( e ) { return { error: e, data: null } }
}


export async function findMember ( { userId, workspaceId }: Omit<MemberInformation, "role"> ) {
    try {

        const member = await db.query.MemberTable.findFirst( {
            where: and(
                eq( MemberTable.userId, userId ),
                eq( MemberTable.workspaceId, workspaceId )
            )
        } )

        return { error: null, data: member }

    } catch ( e ) { return { error: e, data: null } }
}


export async function createMember ( { userId, workspaceId, role }: MemberInformation ) {
    try {

        const member = await db.insert( MemberTable )
            .values( {
                userId: userId,
                workspaceId: workspaceId,
                role
            } )
            .returning()

        return { error: null, data: member }

    } catch ( e ) { return { error: e, data: null } }
}


export async function updateMember ( { userId, workspaceId, role }: MemberInformation ) {
    try {

        const member = await db.update( MemberTable )
            .set( { role } )
            .where( and(
                eq( MemberTable.userId, userId ),
                eq( MemberTable.workspaceId, workspaceId )
            ) )
            .returning()

        return { error: null, data: member }

    } catch ( e ) { return { error: e, data: null } }
}


export async function deleteMember ( { userId, workspaceId }: Omit<MemberInformation, "role"> ) {
    try {

        await db.delete( MemberTable )
            .where( and(
                eq( MemberTable.userId, userId ),
                eq( MemberTable.workspaceId, workspaceId )
            ) )

        return { error: null, data: true }

    } catch ( e ) { return { error: e, data: null } }
}
