import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const Products = lazy(() => import("@/pages/Admin/Products"));
const Orders = lazy(() => import("@/pages/Admin/Orders"));
const Categories = lazy(() => import("@/pages/Admin/Categories"));

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
            {
                title: "Products",
                url: makeAdminRoute("products"),
                component: Products
            },
            {
                title: "Orders",
                url: makeAdminRoute("orders"),
                component: Orders
            },
            {
                title: "Categories",
                url: makeAdminRoute("categories"),
                component: Categories
            },
        ],
    },
]
