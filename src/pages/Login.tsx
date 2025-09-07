import Logo from "@/assets/icons/Logo"
import { LoginForm } from "@/components/modules/Authentication/LoginForm"
import { Link, Navigate } from "react-router"
import bg from "@/assets/images/login_background_image.jpg";
import { useUserQuery } from "@/redux/features/auth/auth.api";
import FullPageLoader from "@/components/custom/FullPageLoader";

export default function LoginPage() {
    const { data, isFetching } = useUserQuery();

    if (isFetching) {
        return <FullPageLoader />
    }

    if (data?.data.email) return <Navigate to="/" />

    return (
        <div className="grid min-h-svh lg:grid-cols-2 bg-gradient-to-b from-white from-30% to-accent/50">
            <div className="relative hidden lg:block m-5">
                <img
                    src={bg}
                    alt="Image"
                    className="rounded-lg absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link to="/"><Logo /></Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        <LoginForm />
                    </div>
                </div>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="underline underline-offset-4">
                        Sign up
                    </Link>
                </div>
            </div>

        </div>
    )
}
