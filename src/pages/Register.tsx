import Logo from "@/assets/icons/Logo"
import { Link } from "react-router"
import bg from "@/assets/images/register_background_image.jpg";
import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="grid min-h-screen lg:grid-cols-2 bg-gradient-to-br from-white from-30% to-accent/50">
            <div className="flex flex-col justify-between gap-4 p-5 md:pt-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link to="/"><Logo /></Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-2xl">
                        <RegisterForm />
                    </div>
                </div>
                <div className="text-sm flex flex-col lg:flex-row justify-between items-center gap-3 lg:gap-0 mt-5 lg:mt-0">
                    <div>
                        <span className="text-gray-700">Have an account?{" "}</span>
                        <Link to="/login" className="underline underline-offset-4">
                            Sign In
                        </Link>
                    </div>
                    <div>
                        <Link to="/terms" className="underline underline-offset-4">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block m-5">
                <img
                    src={bg}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale rounded-xl"
                />
            </div>

        </div>
    )
}
