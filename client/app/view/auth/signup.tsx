import { SignupForm } from "~/components/signup-form";
import { Link } from "react-router";

export default function SignupPage () {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link to="#" className="flex items-center gap-2 font-medium">
                        <img
                            src="/img/enso-simple.png"
                            alt="Wu Wei Ezno"
                            className="size-16 object-contain"
                        />
                        Wu Wei Inc.
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm />
                    </div>
                </div>

            </div>

            <div className="relative hidden lg:block bg-[#F2F1ED]">
                <img
                    src="/img/enso.png"
                    alt="Wu Wei Enso"
                    className="h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
