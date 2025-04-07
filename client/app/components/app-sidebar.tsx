import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "~/components/nav-documents"
import { NavMain } from "~/components/nav-main"
import { NavSecondary } from "~/components/nav-secondary"
import { NavUser } from "~/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { data } from "~/lib/constants/sidebar-data"
import { Select } from "./ui/select"

export function AppSidebar ( { ...props }: React.ComponentProps<typeof Sidebar> ) {
  return (
    <Sidebar collapsible="offcanvas" { ...props }>

      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Select> // TODO IMPLEMENT SELECT //
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Workspace</span>
              </Select>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={ data.navMain } />
        <NavDocuments items={ data.documents } />
        <NavSecondary items={ data.navSecondary } className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={ data.user } />
      </SidebarFooter>

    </Sidebar>
  )
}
