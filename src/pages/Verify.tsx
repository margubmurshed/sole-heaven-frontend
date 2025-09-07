import { Navigate, useLocation } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useSendOTPMutation, useVerifyOTPMutation } from "@/redux/features/auth/auth.api";
import { useEffect, useState } from "react";
import Logo from "@/assets/icons/Logo";
import { UserRoundCheckIcon } from "lucide-react";

const FormSchema = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})


const Verify = () => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [timer, setTimer] = useState(120);
    const [otpSession, setOtpSession] = useState(0);
    const location = useLocation();
    const [sendOTP, { isLoading: sendOTPLoading }] = useSendOTPMutation();
    const [verifyOTP] = useVerifyOTPMutation();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            otp: "",
        },
    })

    useEffect(() => {
        if (!(location.state && isConfirmed)) return;

        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev > 0) {
                    return prev - 1
                } else {
                    clearInterval(interval);
                    return 0
                }
            })
        }, 1000)

        return () => clearInterval(interval);
    }, [location.state, isConfirmed, otpSession])
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const toastID = toast.loading("Verifying OTP");
        try {
            const response = await verifyOTP({ email: location.state, otp: data.otp }).unwrap();
            if (response.success) {
                toast.success("OTP is verified!", { id: toastID })
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            toast.error(error.data.message || error.message, { id: toastID })
        }
    }

    const handleConfirm = async () => {
        try {
            const response = await sendOTP({ email: location.state }).unwrap();

            if (response.success) {
                toast.success("OTP Sent!");
                setIsConfirmed(true);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            toast.error(error.data.message || error.message)
        }
    }

    const handleResendOTP = async () => {
        const toastID = toast.loading("Sending OTP")
        try {
            const response = await sendOTP({ email: location.state }).unwrap();
            if (response.success) {
                toast.success("OTP Sent!", { id: toastID });
                setTimer(120);
                setOtpSession(prev => prev + 1);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            toast.error(error.data.message || error.message, { id: toastID })
        }
    }

    if (!location.state) return <Navigate to="/" />

    return (
        <div className="mx-auto container space-y-8 px-4 py-16 lg:px-2">
            <div className="flex justify-center"><Logo /></div>
            <div className="shadow-md border rounded-md max-w-lg mx-auto px-5 py-10">
                <div className="text-center space-y-5">
                    <h2 className="text-2xl md:text-4xl">Verify your account</h2>
                    <p className="text-gray-700">{isConfirmed ? `Please enter 6 digit code we've sent to ${location.state}` : `We will send 6 digit code to ${location.state} when you confirm.`}</p>
                </div>
                {isConfirmed
                    ? (<Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto flex flex-col items-center mt-5">
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="justify-self-center">One-Time Password</FormLabel>
                                        <FormControl className="justify-center">
                                            <div className="flex justify-center">
                                                <InputOTP className="justify-center" maxLength={6} {...field} >
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={1} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={2} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={3} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={4} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                        <div className="flex flex-col items-center">
                                            <Button onClick={handleResendOTP} disabled={!!timer || sendOTPLoading} variant="link" type="button">Resend OTP</Button>
                                            <p className={timer ? "" : "hidden"}>Resend OTP in {timer} seconds</p>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>) : (
                        <div className="text-center mt-5">
                            <Button className="w-full py-6" onClick={handleConfirm} disabled={sendOTPLoading}>{sendOTPLoading ? "Sending OTP..." : "Confirm"} <UserRoundCheckIcon /></Button>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Verify;