import { Menu } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router";
import Logo from "@/assets/icons/Logo";
import { authApi, useLogoutMutation, useUserQuery } from "@/redux/features/auth/auth.api";
import ButtonLoader from "../custom/ButtonLoader";
import { userRoles } from "@/constatnts/role";
import { Skeleton } from "../ui/skeleton";
import { useAppDispatch } from "@/redux/hooks";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface NavbarProps {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
    };
}

const Navbar = ({
    auth = {
        login: { title: "Login", url: "/login" },
    },
}: NavbarProps) => {
    const { data, isLoading } = useUserQuery();
    const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            await logout(undefined).unwrap();
            dispatch(authApi.util.resetApiState());
        } catch (error) {
            console.error("Logout failed", error);
        }
    }

    const menu = [
        { title: "Home", url: "/" },
        { title: "Shop", url: "/shop" },
        { title: "About", url: "/about" },
        { title: "Features", url: "/features" },
        { title: "Reviews", url: "/reviews" },
        { title: "FAQ", url: "/faq" },
        { title: "Contact", url: "/contact" },
    ]

    if (data?.data.email) {
        if (data.data.role === userRoles.ADMIN || data.data.role === userRoles.SUPER_ADMIN) {
            menu.push({ title: "Dashboard", url: "/admin" })
        } else {
            menu.push({ title: "Dashboard", url: "/user" })
        }
    }
    return (
        <section className="py-4 border-b">
            <div className="container mx-auto">
                {/* Desktop Menu */}
                <nav className="hidden justify-between lg:flex items-center">
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <Logo />
                        </Link>
                        <div className="flex items-center">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {menu.map((item) => renderMenuItem(item))}
                                    {isLoading && Array.from({ length: 2 }).map((_, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            {/* icon placeholder */}
                                            <Skeleton className="h-4 w-4 rounded bg-gray-200" />
                                            {/* text placeholder */}
                                            <Skeleton className="h-4 w-16 rounded bg-gray-200" />
                                        </div>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {isLoading ?
                            (<Button variant="outline" size="sm">
                                <ButtonLoader />
                            </Button>)
                            : data?.data.email
                                ? (<Button variant="destructive" size="sm" onClick={handleLogout} disabled={logoutLoading}>
                                    Sign Out
                                </Button>)
                                : (<Button asChild variant="outline" size="sm">
                                    <Link to={auth.login.url}>{auth.login.title}</Link>
                                </Button>)
                        }
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden pr-3">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <Logo className="w-[120px]" />
                        </Link>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader className="border-b">
                                    <SheetTitle>
                                        <Link to="/" className="flex items-center gap-2">
                                            <Logo className="w-[120px]" />
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 p-4">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="flex w-full flex-col gap-4"
                                    >
                                        {menu.map((item) => renderMobileMenuItem(item))}
                                    </Accordion>

                                    <div className="flex flex-col gap-3">
                                        {isLoading ?
                                            (<Button variant="outline">
                                                <ButtonLoader />
                                            </Button>)
                                            : data?.data.email
                                                ? (<Button variant="destructive" onClick={handleLogout} disabled={logoutLoading}>
                                                    Sign Out
                                                </Button>)
                                                : (<Button asChild variant="outline">
                                                    <Link to={auth.login.url}>{auth.login.title}</Link>
                                                </Button>)
                                        }
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover text-popover-foreground">
                    {item.items.map((subItem) => (
                        <NavigationMenuLink asChild key={subItem.title} className="w-80">
                            <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                href={item.url}
                className="bg-background hover:bg-primary/10 hover:text-primary group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
                asChild
            >
                <Link to={item.url}>{item.title}</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title} className="border-b-0">
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <Link key={item.title} to={item.url} className="text-md font-semibold">
            {item.title}
        </Link>
    );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
        <Link
            className="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
            to={item.url}
        >
            <div className="text-foreground">{item.icon}</div>
            <div>
                <div className="text-sm font-semibold">{item.title}</div>
                {item.description && (
                    <p className="text-muted-foreground text-sm leading-snug">
                        {item.description}
                    </p>
                )}
            </div>
        </Link>
    );
};

export { Navbar };
