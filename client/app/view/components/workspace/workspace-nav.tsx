import { ModeToggle } from "~/components/mode-toggle";
import { Profile } from "../profile";

export function WorkspaceNav () {
    return <nav className="flex justify-between px-4">
        <div className="flex gap-4">
            Navbar
        </div>

        <div className="flex gap-4">
            <ModeToggle />
            <Profile />
        </div>
    </nav>
}