// import UserProfile from "@/pages/User/Profile";
import type { ISidebarItem } from "@/types";
// import { generateRoutes } from "@/utils/generateRoutes";
// import { lazy } from "react";

// const Bookings = lazy(() => import("@/pages/User/Bookings"));

// const makeUserRoute = (route: string) => `/user/${route}`;

export const userSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        url: "#",
        items: [
            // {
            //     title: "Bookings",
            //     url: makeUserRoute("bookings"),
            //     component: Bookings
            // },
        ],
    }
]