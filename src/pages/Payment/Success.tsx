import { useSearchParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/custom/Badge";

export default function PaymentSuccessPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const transactionId = searchParams.get("transactionId") || "";
    const amount = searchParams.get("amount") || "";
    const message = searchParams.get("message") || "Payment completed successfully!";
    const status = searchParams.get("status") || "success";

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-green-50 dark:bg-gray-900 text-center space-y-6">
            {/* Success Icon */}
            {status === "success" && (
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-green-600 dark:bg-green-500 text-white text-5xl">
                    <CheckCircle size={50} />
                </div>
            )}

            {/* Message */}
            <h1 className="text-3xl font-bold text-green-600 dark:text-green-400">{message}</h1>

            {/* Transaction Details */}
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow-md space-y-2 w-full max-w-md">
                {transactionId && (
                    <p>
                        <strong>Transaction ID:</strong> {transactionId}
                    </p>
                )}
                {amount && (
                    <p>
                        <strong>Amount Paid:</strong> ৳{amount}
                    </p>
                )}
                <p>
                    <strong>Status: {" "}</strong><Badge variant="success">{status.toUpperCase()}</Badge>
                </p>
            </div>

            {/* Back to Tours */}
            <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
        </div>
    );
}
