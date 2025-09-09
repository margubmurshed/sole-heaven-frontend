import { Badge } from "@/components/custom/Badge";
import RegisterPasswordInput from "@/components/custom/RegisterPasswordInput";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useUpdateUserMutation, useUserQuery } from "@/redux/features/auth/auth.api";
import { updatePasswordSchema, updateUserZodSchema } from "@/validations/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

function Profile() {
    const { data: userData, isLoading: userLoading } = useUserQuery();
    const [updateUser, { isLoading: updateUserLoading }] = useUpdateUserMutation();
    // const [password, setPassword] = useState("");
    const profileForm = useForm({
        resolver: zodResolver(updateUserZodSchema),
        defaultValues: {
            name: "",
        }
    })
    const passwordForm = useForm({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            password: ""
        }
    })

    useEffect(() => {
        if (userData?.data) {
            profileForm.reset({
                name: userData.data.name,
            })
        }
    }, [profileForm, userData])

    const onSubmit = async (values: z.infer<typeof updateUserZodSchema>) => {
        const updateUserData = {
            _id: userData?.data._id as string,
            ...values
        }
        try {
            const response = await updateUser(updateUserData).unwrap();

            if (response.success) {
                toast.success(response.message);
                passwordForm.reset({password:""})
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.data?.message || error.message)
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <Card className="w-full mx-auto shadow-none border-0">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Your Profile</CardTitle>
                    <CardDescription>
                        Update your information if needed and hit update
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onSubmit)} id="profile-form">
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-3">
                                    <FormField
                                        control={profileForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your full name" {...field} required />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormLabel>Email</FormLabel>
                                    <Input value={userData?.data.email} disabled />
                                </div>
                                <div className="grid gap-3">
                                    <FormLabel>Phone</FormLabel>
                                    <Input value={userData?.data.phone} disabled />
                                </div>
                                <div className="grid gap-3">
                                    <FormLabel>Account Creation Time</FormLabel>
                                    <Input value={new Date(userData?.data.createdAt as string).toDateString()} disabled />
                                </div>
                                <div className="flex items-center gap-3">
                                    <FormLabel>Account Status</FormLabel>
                                    <Badge variant={userData?.data.isVerified ? "success": "destructive"} className="flex gap-1">{userData?.data.isVerified ? <><Check size={15}/>Verified</>: "Not Verified"}</Badge>
                                    <Badge variant={userData?.data.isActive === "ACTIVE"? "success": "destructive"} className="capitalize">{userData?.data.isActive.toLowerCase()}</Badge>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" form="profile-form" disabled={updateUserLoading || userLoading || !profileForm.formState.isDirty}>
                        Update Profile
                    </Button>
                </CardFooter>
            </Card>
            <Card className="w-full mx-auto flex flex-col justify-center">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Update Password</CardTitle>
                    <CardDescription>
                        Update your password if needed and hit update
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onSubmit)} id="update-password-form">
                            <div className="grid gap-3">
                                <FormField
                                    control={passwordForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <RegisterPasswordInput
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" form="update-password-form" className="w-full" disabled={updateUserLoading || userLoading || !passwordForm.formState.isDirty}>
                        Update Password
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Profile;