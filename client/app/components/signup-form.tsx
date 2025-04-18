import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Form, Link } from "react-router"
import { signupUser } from "~/use-cases/auth"
import type { Route } from "../+types/root"
import { useFormData } from "~/hooks/use-form-data"
import { UserSchema } from "~/entities/user"
import z from "zod"

// ! FIX FORM ACTION PATH ! //
export async function action ( { request }: Route.ClientActionArgs ) {
    const formData = await request.formData();
    const accessToken = await signupUser( formData )

    // ! CHECK FOR ERROR => useActionData ! //

    return accessToken // TODO REDIRECT WITH ACCESS TOKEN //
}


const SignupFormSchema = UserSchema.pick( { username: true, email: true } )
    .extend( {
        password: z.string().nonempty(),
        confirmPassword: z.string().nonempty()
    } )


export function SignupForm ( { ...props }: any ) {
    const initialFormData = {
        username: "", email: "", password: "", confirmPassword: ""
    }

    const { formData, handleChange } = useFormData<z.infer<typeof SignupFormSchema>>( initialFormData )

    return <Form className="flex flex-col gap-6" { ...props } method="POST">
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground text-sm text-balance">Enter your email below to create an account</p>
        </div>

        <div className="grid gap-6">
            <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="usernameInput"
                    name="username"
                    placeholder="Ex. jamesbond007"
                    value={ formData.username }
                    onChange={ handleChange }
                />
            </div>

            <div className="grid gap-3">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                    id="emailInput"
                    name="email"
                    placeholder="Ex. jamesbond007@mi6.com"
                    value={ formData.email }
                    onChange={ handleChange }
                />
            </div>

            <div className="grid gap-3">

                <Label htmlFor="password">Password</Label>
                <Input
                    id="passwordInput"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={ formData.password }
                    onChange={ handleChange }
                />
            </div>

            <div className="grid gap-3">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                    id="confirmPasswordInput"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={ formData.confirmPassword }
                    onChange={ handleChange }
                />
            </div>

            <Button type="submit" className="w-full cursor-pointer">Create Account</Button>
        </div>

        <div className="text-center text-sm">
            <p>Already have an account?</p>
            <Link to="/login" className="underline underline-offset-4 cursor-pointer">Log In</Link>
        </div>
    </Form>
}
