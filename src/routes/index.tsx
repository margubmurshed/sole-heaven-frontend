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
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import PaymentSuccessPage from "@/pages/Payment/Success";
import PaymentFailPage from "@/pages/Payment/Fail";
import PaymentCancelPage from "@/pages/Payment/Cancel";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

export const router = createBrowserRouter([
    {
        path: "/", Component: PrimaryLayout, children: [
            { index: true, Component: Landing },
            { path: "about", Component: About },
            { path: "contact", Component: Contact },
            { path: "shop", Component: Shop },
            { path: "cart", Component: Cart },
            { path: "terms-and-conditions", Component: Terms },
            { path: "privacy-policy", Component: PrivacyPolicy },
            { path: "checkout", Component: withAuth(Checkout) },
            { path: "product/:slug", Component: ProductDetails },
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
            { index: true, element: <Navigate to="/user/orders" replace /> },
            ...generateRoutes(userSidebarItems)
        ]
    },
    { path: "/login", Component: Login },
    { path: "/register", Component: Register },
    { path: "/unauthorized", Component: Unauthorized },
    { path: "verify", Component: Verify },
    { path: "payment/success", Component: PaymentSuccessPage },
    { path: "payment/fail", Component: PaymentFailPage },
    { path: "payment/cancel", Component: PaymentCancelPage },
])