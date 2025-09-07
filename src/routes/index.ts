import PrimaryLayout from "@/components/layouts/PrimaryLayout";
import About from "@/pages/About";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Shop from "@/pages/Shop";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/", Component: PrimaryLayout, children: [
            { index: true, Component: Landing },
            { path: "about", Component: About },
            { path: "shop", Component: Shop },
        ]
    },
    { path: "/login", Component: Login },
    { path: "/register", Component: Register },
    { path: "verify", Component: Verify }
])