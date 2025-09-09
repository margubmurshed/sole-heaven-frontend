import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Orders = lazy(() => import("@/pages/User/Orders"));
const Profile = lazy(() => import("@/pages/User/Profile"));

const makeUserRoute = (route: string) => `/user/${route}`;

export const userSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        url: "#",
        items: [
            {
                title: "Orders",
                url: makeUserRoute("orders"),
                component: Orders
            },
            {
                title: "Profile",
                url: makeUserRoute("profile"),
                component: Profile
            },
        ],
    }
]