import { Link } from "react-router"
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar"

export function NavUser ( { user }: {
  user: {
    name: string
    email: string
    avatar: string
  }
} ) {
  const { isMobile } = useSidebar()

  return <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>

        <DropdownMenuTrigger asChild>
          <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer">

            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarImage src={ user.avatar } alt={ user.name } />
              <AvatarFallback className="rounded-lg">
                { user.name.slice( 0, 2 ).toUpperCase() }
              </AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{ user.name }</span>
              <span className="text-muted-foreground truncate text-xs">{ user.email }</span>
            </div>

            <IconDotsVertical className="ml-auto size-4" />

          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          side={ isMobile ? "bottom" : "right" }
          align="end"
          sideOffset={ 4 }
        >

          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/profile" className="">
                <IconUserCircle />
                Account
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/billing">
                <IconCreditCard />
                Billing
              </Link >
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/notifications">
                <IconNotification />
                Notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="cursor-pointer text-destructive hover:underline">
            <Link to="/logout">
              <IconLogout className="text-destructive" />
              Log Out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>

      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu >
}
