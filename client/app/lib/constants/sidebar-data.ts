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
            title: "Members",
            url: "/members",
            icon: IconUsers,
        },
    ],
    navSecondary: [
        {
            title: "Search",
            url: "/search",
            icon: IconSearch,
        },
        {
            title: "Settings",
            url: "/settings",
            icon: IconSettings,
        },
    ],
    documents: [ // ! CUSTOM GENERATE ! //
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