import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function PaymentFailPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-red-50 text-center space-y-6">
            {/* Failure Icon */}
            <div className="text-red-600 text-6xl">❌</div>

            {/* Message */}
            <h1 className="text-3xl font-bold">Payment Failed!</h1>
            <p className="text-muted-foreground max-w-md">
                Unfortunately, your payment could not be processed. Please try again or contact support if the issue persists.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button variant="destructive" onClick={() => navigate("/booking")}>
                    Retry Payment
                </Button>
                <Button onClick={() => navigate("/tours")}>Back to Tours</Button>
            </div>
        </div>
    );
}
