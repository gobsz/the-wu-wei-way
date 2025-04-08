import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index( "routes/home.tsx" ),

    route( "/signup", "routes/auth/signup.tsx" ),
    route( "/login", "routes/auth/login.tsx" ),
    route( "/logout", "routes/auth/logout.tsx" ),

    route( "/protected", "routes/protected.tsx" ),
    layout( "routes/workspace/workspaceLayout.tsx", [
        route( "/dashboard", "routes/workspace/dashboard.tsx" )
    ] )
] satisfies RouteConfig;
