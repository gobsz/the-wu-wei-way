import type { WorkspaceType } from "~/entities/workspace"
import { SelectDropdown } from "../select-dropdown"
import { SelectItem } from "~/components/ui/select"
import { Button } from "~/components/ui/button"
import { Link, useParams } from "react-router"
import { LayoutDashboard, LucideAtom, Settings, Users2 } from "lucide-react"

type WorkspaceSidebarProps = {
    workspaces: WorkspaceType[],
}

export function WorkspaceSidebar ( { workspaces }: WorkspaceSidebarProps ) {
    const { workspaceId } = useParams()

    return <aside className="w-[18%] h-screen">
        <SelectDropdown
            placeholder='Select a Workspace'
            label='Your Workspaces'
            listData={ workspaces }
            listFunction={ workspaceListFunc }
        />

        // ! XSS ! //
        <Button asChild>
            <Link to={ `/workspace/${workspaceId}/` }>
                <LayoutDashboard /> Dashboard
            </Link>
        </Button>

        <Button asChild>
            <Link to={ `/workspace/${workspaceId}/projects` }>
                <LucideAtom /> Projects
            </Link>
        </Button>

        <Button asChild>
            <Link to={ `/workspace/${workspaceId}/members` }>
                <Users2 /> Members
            </Link>
        </Button>

        <Button asChild>
            <Link to={ `/workspace/${workspaceId}/Settings` }>
                <Settings />Settings
            </Link>
        </Button>
    </aside>
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