import FullPageLoader from "@/components/custom/FullPageLoader";
import { useUserQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";

export const withAuth = (Component: ComponentType, requiredRoles?: TRole[]) => {
    return () => {
        const { data, isLoading } = useUserQuery();
        const location = useLocation();

        const email = data?.data.email;
        const role = data?.data.role;

        if (isLoading) {
            return <FullPageLoader />;
        }

        if (!email || !role) {
            return <Navigate to="/login" state={location.pathname} replace />;
        }

        if (requiredRoles?.length && requiredRoles.indexOf(role as TRole) === -1) {
            return <Navigate to="/unauthorized" replace />;
        }

        return <Component />;
    };
}