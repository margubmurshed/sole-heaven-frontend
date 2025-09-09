import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import { Badge } from "@/components/custom/Badge";

export default function PaymentCancelPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-yellow-50 dark:bg-gray-900 text-center space-y-6">
            {/* Cancel Icon */}
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-yellow-500 dark:bg-yellow-600 text-white text-5xl">
                <AlertCircleIcon size={50} />
            </div>

            {/* Message */}
            <h1 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                Payment Cancelled
            </h1>
            <p className="text-muted-foreground max-w-md">
                You have cancelled the payment. If this was a mistake, you can try again.
            </p>

            {/* Status Badge */}
            <Badge variant="secondary">CANCELLED</Badge>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button variant="outline" onClick={() => navigate("/booking")}>
                    Retry Payment
                </Button>
                <Button onClick={() => navigate("/tours")}>Back to Tours</Button>
            </div>
        </div>
    );
}
