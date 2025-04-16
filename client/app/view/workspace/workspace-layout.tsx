import { SelectDropdown } from "~/view/components/select-dropdown"
import type { WorkspaceType } from "~/entities/workspace"
import { SelectItem } from "~/components/ui/select"
import { Outlet } from "react-router"
import { WorkspaceNav } from "../components/workspace/workspace-nav"


export default function WorkspaceLayout () {
    const workspaces: WorkspaceType[] = []

    return <div className="flex max-h-screen p-4">

        <aside className="w-[18%] h-screen">
            <SelectDropdown
                placeholder='Select a Workspace'
                label='Your Workspaces'
                listData={ workspaces }
                listFunction={ workspaceListFunc }
            />
        </aside>

        <div className="@container/main flex flex-1 flex-col gap-2">

            <WorkspaceNav />

            <main className="flex flex-col gap-4 md:gap-6 md:py-2 overflow-y-scroll">
                <Outlet />
            </main>

        </div>
    </div>
}

function workspaceListFunc ( workspaces: WorkspaceType[] ) {
    // TODO: CHECK FOR SELECTED WORKSPACE //
    return workspaces.map( w => {
        return (
            <SelectItem
                defaultChecked={ w.id == "true" }
                value={ w.id }
            >
                { w.workspace_name }
            </SelectItem>
        )
    } )
}