import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar';
import type { WorkspaceType } from '~/entities/workspace';
import { SelectDropdown } from '~/lib/components/select-dropdown';
import { SelectItem } from '~/components/ui/select';

type SidebarHeaderComponentProps = { workspaces: WorkspaceType[] }

export default function SidebarHeaderComponent ( {
    workspaces
}: SidebarHeaderComponentProps ) {

    return <SidebarHeader>
        <SidebarMenu>

            <SidebarMenuItem>
                <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                    <SelectDropdown
                        placeholder='Select a Workspace'
                        label='Your Workspaces'
                        data={ workspaces }
                        func={ workspaceListFunc }
                    />
                </SidebarMenuButton>
            </SidebarMenuItem>

        </SidebarMenu>
    </SidebarHeader>
};


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