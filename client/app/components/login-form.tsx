import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Form, Link } from "react-router"
import { loginUser } from "~/use-cases/auth"
import type { Route } from "../+types/root"
import { useFormData } from "~/hooks/use-form-data"
import z from "zod"
import { UserSchema } from "~/entities/user"

export async function action ( { request }: Route.ClientActionArgs ) {
  const formData = await request.formData();
  const accessToken = await loginUser( formData )

  // ! CHECK FOR ERROR => useActionData ! //

  return accessToken // TODO REDIRECT WITH ACCESS TOKEN //
}

const LoginFormSchema = UserSchema.pick( { username: true } ).extend( { password: z.string().nonempty() } )

export function LoginForm ( { ...props }: any ) {
  const { formData, handleChange } = useFormData<z.infer<typeof LoginFormSchema>>( {
    username: "", password: ""
  } )

  return <Form className="flex flex-col gap-6" { ...props } method="post">
    <div className="flex flex-col items-center gap-2 text-center">
      <h1 className="text-2xl font-bold">Login to your account</h1>
      <p className="text-muted-foreground text-sm text-balance">Enter your email below to login to your account</p>
    </div>

    <div className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="username">Username</Label>
        <Input
          name="username"
          placeholder="'batman'"
          value={ formData.username }
          onChange={ handleChange }
        />
      </div>

      <div className="grid gap-3">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Link to="#" className="ml-auto text-sm underline-offset-4 hover:underline cursor-pointer">Forgot your password?</Link>
        </div>

        <Input
          name="password"
          type="password"
          value={ formData.password }
          onChange={ handleChange }
        />
      </div>

      <Button type="submit" className="w-full cursor-pointer">Login</Button>
    </div>

    <div className="text-center text-sm">
      Don&apos;t have an account?{ " " }
      <Link to="/signup" className="underline underline-offset-4 cursor-pointer">Sign up</Link>
    </div>
  </Form>
}
