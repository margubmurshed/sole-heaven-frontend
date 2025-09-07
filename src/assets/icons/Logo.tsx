import lightLogoImage from "@/assets/images/SOLE-HEAVEN-LIGHT-LOGO.png";
import darkLogoImage from "@/assets/images/SOLE-HEAVEN-DARK-LOGO.png";

const Logo = () => {
    return (
        <div>
            <img src={lightLogoImage} alt="logo" className="w-[150px] dark:hidden"/>
            <img src={darkLogoImage} alt="logo" className="w-[50px] hidden dark:inline-block"/>
        </div>
    );
};

export default Logo;