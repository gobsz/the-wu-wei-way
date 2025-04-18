import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";
import { Link, redirect } from "react-router";

export function meta ( { }: Route.MetaArgs ) {
  return [
    { title: "The Wu Wei Way" },
    { name: "Unlock your flow state", content: "Ultra Instinct" },
  ];
}

export function loader () {
  return redirect( "/dashboard" )
}

export default function Home () {
  return (
    <div className="home-container flex p-4 gap-2">
      <Button asChild><Link to="/signup">Sign Up</Link></Button>

      <Button asChild><Link to="/login">Login</Link></Button>

      <Button asChild><Link to="/dashboard">Dashboard</Link></Button>
    </div>
  );
};
