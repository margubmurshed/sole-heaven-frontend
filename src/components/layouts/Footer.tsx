import Logo from "@/assets/icons/Logo";
import { LocationEdit, MailIcon, PhoneIcon } from "lucide-react";
import { Link } from "react-router";

interface MenuItem {
    title: string;
    links: {
        text: string;
        url: string;
    }[];
}

interface Footer2Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    tagline?: string;
    menuItems?: MenuItem[];
    copyright?: string;
    bottomLinks?: {
        text: string;
        url: string;
    }[];
}

const Footer = ({
    menuItems = [
        {
            title: "Product",
            links: [
                { text: "Shop", url: "/shop" },
                { text: "Cart", url: "/cart" },
                { text: "Checkout", url: "/checkout" },
            ],
        },
        {
            title: "Company",
            links: [
                { text: "About", url: "/about" },
                { text: "User Dashboard", url: "/user" },
                { text: "Admin Dashboard", url: "/admin" },
                { text: "Contact", url: "/contact" },
                { text: "Privacy", url: "/privacy-policy" },
            ],
        },
        {
            title: "Social",
            links: [
                { text: "Twitter", url: "#" },
                { text: "Instagram", url: "#" },
                { text: "LinkedIn", url: "#" },
            ],
        },
    ],
    copyright = "© 2024 Sole Heaven Bangladesh. All rights reserved.",
    bottomLinks = [
        { text: "Terms and Conditions", url: "/terms-and-conditions" },
        { text: "Privacy Policy", url: "/privacy-policy" },
    ],
}: Footer2Props) => {
    return (
        <section className="py-32 px-5 lg:px-0">
            <div className="container mx-auto">
                <footer>
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
                        <div className="col-span-2 mb-8 lg:mb-0 space-y-5">
                            <div className="flex items-center gap-2 lg:justify-start">
                                <Logo className="w-[278px] -ml-7" />
                            </div>
                            <div className="space-y-5 lg:w-2/3 w-full">
                                <div className="flex items-center gap-2">
                                    <LocationEdit className="text-primary" />
                                    <a href="https://shorturl.at/eotIy" target="_blank">#35, 4th floor, Capital Siraj Centre, Baily Road, Dhaka, Bangladesh</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MailIcon className="text-primary" />
                                    <a href="mailto:soleheavenbd@gmail.com" target="_blank">soleheavenbd@gmail.com</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PhoneIcon className="text-primary" />
                                    <a href="+88001863370828" target="_blank">+8801863-370828</a>
                                </div>
                            </div>
                        </div>
                        {menuItems.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                                <h3 className="mb-4 font-bold">{section.title}</h3>
                                <ul className="text-muted-foreground space-y-4">
                                    {section.links.map((link, linkIdx) => (
                                        <li
                                            key={linkIdx}
                                            className="hover:text-primary font-medium"
                                        >
                                            <Link to={link.url}>{link.text}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
                        <p className="text-center lg:text-left">{copyright}</p>
                        <ul className="flex justify-center lg:justify-end gap-4">
                            {bottomLinks.map((link, linkIdx) => (
                                <li key={linkIdx} className="hover:text-primary underline">
                                    <a href={link.url}>{link.text}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default Footer;
