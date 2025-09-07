import DashboardLayout from "@/components/layouts/DashboardLayout";
import PrimaryLayout from "@/components/layouts/PrimaryLayout";
import { userRoles } from "@/constatnts/role";
import About from "@/pages/About";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Shop from "@/pages/Shop";
import Verify from "@/pages/Verify";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import Unauthorized from "@/pages/Unauthorized";

export const router = createBrowserRouter([
    {
        path: "/", Component: PrimaryLayout, children: [
            { index: true, Component: Landing },
            { path: "about", Component: About },
            { path: "shop", Component: Shop },
        ]
    },
    {
        path: "/admin",
        Component: withAuth(DashboardLayout, [userRoles.ADMIN as TRole, userRoles.SUPER_ADMIN as TRole]),
        children: [
            { index: true, element: <Navigate to="/admin/analytics" replace /> },
            ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        path: "/user",
        Component: withAuth(DashboardLayout, [userRoles.USER as TRole]),
        children: [
            { index: true, element: <Navigate to="/user/bookings" replace /> },
            ...generateRoutes(userSidebarItems)
        ]
    },
    { path: "/login", Component: Login },
    { path: "/register", Component: Register },
    { path: "/unauthorized", Component: Unauthorized },
    { path: "verify", Component: Verify }
])