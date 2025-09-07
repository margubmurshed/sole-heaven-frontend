
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function Unauthorized() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-foreground px-4">
            <h1 className="text-4xl font-bold mb-4">401</h1>
            <p className="text-lg mb-6 text-muted-foreground">
                You are not authorized to access this page.
            </p>
            <Link to="/">
                <Button variant="outline">Go to Home</Button>
            </Link>
        </div>
    )
}
