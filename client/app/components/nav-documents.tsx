"use client"

import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
  type Icon,
} from "@tabler/icons-react"
import { Plus } from "lucide-react"
import { Link } from "react-router"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar"

export function NavDocuments ( {
  items,
}: {
  items: {
    name: string
    url: string
    icon: Icon
  }[]
} ) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex justify-between">
        <h3>Documents</h3>
        <Plus />
      </SidebarGroupLabel>

      <SidebarMenu>
        {
          items.map( ( item ) => (
            <SidebarMenuItem key={ item.name }>
              <SidebarMenuButton asChild>
                <Link to={ item.url }>
                  <item.icon /><span>{ item.name }</span>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="data-[state=open]:bg-accent rounded-sm cursor-pointer"
                  >
                    <IconDots />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-24 rounded-lg"
                  side={ isMobile ? "bottom" : "right" }
                  align={ isMobile ? "end" : "start" }
                >
                  <DropdownMenuItem>
                    <IconFolder />
                    <span>Open</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <IconShare3 />
                    <span>Share</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem variant="destructive">
                    <IconTrash />
                    <span>Delete</span>
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ) )
        }
      </SidebarMenu>
    </SidebarGroup>
  )
}
