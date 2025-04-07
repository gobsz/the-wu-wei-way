import type { Icon } from "@tabler/icons-react"
import { Link, useLocation } from "react-router"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { cn } from "~/lib/utils"

export function NavMain ( {
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
} ) {
  const location = useLocation()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {
            items.map( ( item ) => (
              <SidebarMenuItem key={ item.title }>
                <SidebarMenuButton
                  tooltip={ item.title }
                  className={ cn( location.pathname == item.url && "text-primary-foreground bg-foreground hover:transition-discrete" ) }
                  asChild
                >
                  <Link to={ item.url }>
                    { item.icon && <item.icon /> }{ item.title }
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) )
          }
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
