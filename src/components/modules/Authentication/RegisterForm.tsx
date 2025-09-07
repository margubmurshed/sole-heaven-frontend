import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import EmailInput from "@/components/custom/EmailInput"
import PasswordInput from "@/components/custom/PasswordInput";
import { useRegisterMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { FaGoogle } from "react-icons/fa";

const registerFormSchema = z.object({
    name: z
        .string({ error: "Name should be a string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
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
    confirmPassword: z.
        string({ error: "Confirm Password should be a string" })
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
    phone: z
        .string({ error: "Phone number should be a string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional()
        .or(z.literal('')),
    address: z
        .string({ error: "Address should be a string" })
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional()
        .or(z.literal(''))
})
    .refine((data) => data.password === data.confirmPassword, {
        error: "Password doesn't match",
        path: ["confirmPassword"]
    })

export function RegisterForm({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {

    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            address: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: ""
        }
    });

    const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
        const userInfo: {
            name: string;
            email: string;
            password: string;
            address?: string;
            phone?: string;
        } = {
            name: data.name,
            email: data.email,
            password: data.password
        }

        if (data.address) {
            userInfo.address = data.address
        }

        if (data.phone) {
            userInfo.phone = data.phone
        }

        try {
            const response = await register(userInfo).unwrap();
            console.log(response);

            toast.success("User created successfully!");
            navigate("/verify", { state: userInfo.email });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error)
            toast.error(error.data.message)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl">Create an account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your details below to create an account
                </p>
            </div>
            <div className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="ml-5 text-gray-500">Name</FormLabel>
                                        <FormControl>
                                            <Input className="py-6 px-4 rounded-full bg-[#fff] border-primary/20 placeholder:text-gray-400" placeholder="Enter your name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="ml-5 text-gray-500">Address</FormLabel>
                                        <FormControl>
                                            <Input className="py-6 px-4 rounded-full bg-[#fff] border-primary/20 placeholder:text-gray-400" placeholder="Enter your address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="ml-5 text-gray-500">Phone</FormLabel>
                                        <FormControl>
                                            <Input className="py-6 px-4 rounded-full bg-[#fff] border-primary/20 placeholder:text-gray-400" placeholder="Enter your Phone" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-5 text-gray-500">Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-5 text-gray-500">Confirm Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field} placeholder="Enter the password again" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-center mt-10">
                            <Button type="submit" className="min-w-xs rounded-full py-6 cursor-pointer">Register</Button>
                        </div>
                    </form>
                </Form>
                <div className="flex justify-center -mt-3">
                    <Button variant="outline" className="min-w-xs rounded-full py-6 cursor-pointer">
                        <FaGoogle /> Login with Google
                    </Button>
                </div>
            </div>
        </div>
    )

}
