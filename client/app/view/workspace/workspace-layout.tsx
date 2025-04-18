import type { WorkspaceType } from "~/entities/workspace"
import { Outlet } from "react-router"
import { WorkspaceNav } from "../components/workspace/workspace-nav"
import { WorkspaceSidebar } from "../components/workspace/workspace-sidebar"

export default function WorkspaceLayout () {
    const workspaces: WorkspaceType[] = []

    return <div className="flex max-h-screen p-4">

        <WorkspaceSidebar workspaces={ workspaces } />

        <div className="@container/main flex flex-1 flex-col gap-2">

            <WorkspaceNav />

            <main className="flex flex-col gap-4 md:gap-6 md:py-2 overflow-y-scroll">
                <Outlet />
            </main>

        </div>
    </div>
}