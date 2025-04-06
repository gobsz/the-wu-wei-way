import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index( "routes/home.tsx" ),
    route( "/login", "features/auth/login.tsx" ),
    route( "/protected", "routes/protected.tsx" )
] satisfies RouteConfig;
