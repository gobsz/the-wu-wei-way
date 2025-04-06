import { LoginForm } from "~/components/login-form"
import { useActionData } from "react-router";
import type { Route } from "../../+types/root";

export async function action ( {
  request,
}: Route.ClientActionArgs ) {
  const formData = await request.formData();
  const formObject = Object.fromEntries( formData.entries() );

  const response = await fetch( "http://localhost:8080/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( formObject )
  } )

  // ! HANDLE ERROR //

  const accessToken = await response.json()
  console.log( accessToken )
  return accessToken
}

export default function LoginPage () {
  const token = useActionData()

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:block bg-[#F2F1ED]">
        <img
          src="/img/enso.png"
          alt="Wu Wei Kanji"
          className="h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">

            {/*
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            */}
            <img
              src="/img/enso-simple.png"
              alt="Wu Wei Ezno"
              className="size-24 object-contain"
            />
            Wu Wei Inc.

          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
