import { Loader2 } from "lucide-react" // Shadcn uses lucide icons
import { cn } from "@/lib/utils"       // optional utility for classNames

interface ButtonLoaderProps {
    size?: "sm" | "md" | "lg"
    className?: string
}

export default function ButtonLoader({ size = "md", className }: ButtonLoaderProps) {
    const sizes = {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
    }

    return (
        <Loader2
            className={cn("animate-spin text-current", sizes[size], className)}
        />
    )
}
