import type { ISidebarItem } from "@/types";
// import { generateRoutes } from "@/utils/generateRoutes";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
// const Tours = lazy(() => import("@/pages/Admin/Tours"));
// const TourTypes = lazy(() => import("@/pages/Admin/TourTypes"));
// const Divisions = lazy(() => import("@/pages/Admin/Divisions"));

const makeAdminRoute = (route: string) => `/admin/${route}`;

export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        url: "#",
        items: [
            {
                title: "Analytics",
                url: makeAdminRoute("analytics"),
                component: Analytics
            },
        ],
    },
]
