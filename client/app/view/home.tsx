import type { Route } from "./+types/home";

export function meta ( { }: Route.MetaArgs ) {
  return [
    { title: "The Wu Wei Way" },
    { name: "Unlock your flow state", content: "Ultra Instinct" },
  ];
}

export default function Home () {
  return <div>Home</div>
}
