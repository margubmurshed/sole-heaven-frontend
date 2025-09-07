import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "@/assets/icons/Logo"
import { Link } from "react-router"
import { useUserQuery } from "@/redux/features/auth/auth.api"
import { getSidebarItems } from "@/utils/getSidebarItems"
import type { TRole } from "@/types"
import { SidebarMenuSkeletonLoader } from "./SidebarLoader"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: userData, isLoading } = useUserQuery();

    const data = {
        navMain: userData?.data.role ? getSidebarItems(userData?.data.role as TRole) : [],
    }
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className="flex flex-col items-center">
                    <Link to="/"><Logo /></Link>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {isLoading
                    ? <SidebarMenuSkeletonLoader />
                    : (
                        data.navMain.map((item) => (
                            <SidebarGroup key={item.title}>
                                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {item.items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton asChild>
                                                    <Link to={item.url}>{item.title}</Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        ))
                    )}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
