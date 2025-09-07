
import { userRoles } from "@/constatnts/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (role: TRole) => {
    switch (role) {
        case userRoles.USER:
            return userSidebarItems;
        case userRoles.ADMIN:
            return adminSidebarItems;
        case userRoles.SUPER_ADMIN:
            return adminSidebarItems
        default:
            return [];
    }
}