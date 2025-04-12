import SidebarHeaderComponent from "~/view/_components/sidebar-header"
import { NavDocuments } from "~/components/nav-documents"
import { NavMain } from "~/components/nav-main"
import { NavSecondary } from "~/components/nav-secondary"
import { NavUser } from "~/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "~/components/ui/sidebar"
import type { WorkspaceType } from "~/entities/workspace"
import { data } from "~/lib/constants/sidebar-data"

export function AppSidebar ( { ...props }: React.ComponentProps<typeof Sidebar> ) {
  const workspaces: WorkspaceType[] = []   // TODO FETCH WORKSPACES //
  const user = data.user                  // TODO: FETCH USER //

  return <Sidebar collapsible="offcanvas" { ...props }>

    <SidebarHeaderComponent workspaces={ workspaces } />

    <SidebarContent>
      <NavMain items={ data.navMain } />
      <NavDocuments items={ data.documents } />
      <NavSecondary items={ data.navSecondary } className="mt-auto" />
    </SidebarContent>

    <SidebarFooter>
      <NavUser user={ user } />
    </SidebarFooter>

  </Sidebar>
}
