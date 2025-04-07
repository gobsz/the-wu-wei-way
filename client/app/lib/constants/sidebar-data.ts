import { IconDashboard, IconChartBar, IconFolder, IconUsers, IconSearch, IconSettings, IconDatabase, IconReport, IconFileWord } from "@tabler/icons-react";

// ! GET WORKSPACE ID ! //
export const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: IconDashboard,
        },
        {
            title: "Projects",
            url: "/projects",
            icon: IconFolder,
        },
        {
            title: "Analytics",
            url: "/analytics",
            icon: IconChartBar,
        },
        {
            title: "Team",
            url: "/team",
            icon: IconUsers,
        },
    ],
    navSecondary: [
        {
            title: "Search",
            url: "#",
            icon: IconSearch,
        },
        {
            title: "Settings",
            url: "#",
            icon: IconSettings,
        },
    ],
    documents: [
        {
            name: "Data Library",
            url: "#",
            icon: IconDatabase,
        },
        {
            name: "Reports",
            url: "#",
            icon: IconReport,
        },
        {
            name: "Word Assistant",
            url: "#",
            icon: IconFileWord,
        },
    ],
}