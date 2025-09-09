import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLocation, useNavigate } from "react-router"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import EmailInput from "@/components/custom/EmailInput"
import PasswordInput from "@/components/custom/PasswordInput"
import { toast } from "sonner"
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import httpStatus from "http-status-codes";
import { envVariables } from "@/config"
import { FaGoogle } from "react-icons/fa"
import ButtonLoader from "@/components/custom/ButtonLoader"

const loginFormSchema = z.object({
    email: z.email({ error: "Invalid email address" })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: z.
        string({ error: "Password should be a string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }),
})

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [login, { isLoading: loginLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
        try {
            const response = await login(data).unwrap();

            if (response.success) {
                toast.success(response.message);
                navigate(location.state || "/", { replace: true });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error)
            toast.error(error?.data?.message || error.message)

            if (error.status === httpStatus.UNAUTHORIZED && error.data.message === "User is not verified") {
                navigate("/verify", { state: data.email })
            }
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-5 text-gray-500">Email</FormLabel>
                                    <FormControl>
                                        <EmailInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center">

                                        <FormLabel className="ml-5 text-gray-500">Password</FormLabel>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <FormControl>
                                        <PasswordInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-center mt-10">
                            <Button type="submit" className="min-w-xs rounded-full py-6 cursor-pointer" disabled={loginLoading}>{loginLoading ? <ButtonLoader /> : "Login"}</Button>
                        </div>
                    </form>
                </Form>

                <div className="flex justify-center -mt-3">
                    <a
                        href={`${envVariables.baseURL}/auth/google?redirect=${location.state || "/"}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline" className="min-w-xs rounded-full py-6 cursor-pointer">

                            <FaGoogle /> Login with Google
                        </Button>
                    </a>

                </div>

            </div>
        </div>
    )
}
