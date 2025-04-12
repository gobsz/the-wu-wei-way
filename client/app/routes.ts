import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index( "view/home.tsx" ),

    route( "/signup", "view/auth/signup.tsx" ),
    route( "/login", "view/auth/login.tsx" ),
    route( "/logout", "view/auth/logout.tsx" ),

    route( "/protected", "view/protected.tsx" ),
    layout( "view/workspace/workspace-layout.tsx", [
        route( "/dashboard", "view/workspace/dashboard.tsx" )
    ] )
] satisfies RouteConfig;
