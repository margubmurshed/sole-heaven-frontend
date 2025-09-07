import lightLogoImage from "@/assets/images/SOLE-HEAVEN-LIGHT-LOGO.png";
import darkLogoImage from "@/assets/images/SOLE-HEAVEN-DARK-LOGO.png";
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
    return (
        <div>
            <img src={lightLogoImage} alt="logo" className={cn("w-[150px] dark:hidden", className)} />
            <img src={darkLogoImage} alt="logo" className={cn("w-[50px] hidden dark:inline-block", className)} />
        </div>
    );
};

export default Logo;