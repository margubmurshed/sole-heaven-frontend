import { Skeleton } from "@/components/ui/skeleton"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function SidebarMenuSkeletonLoader() {
  return (
    <SidebarGroup>
      {/* Group label skeleton */}
      <SidebarGroupLabel>
        <Skeleton className="h-3 w-20" />
      </SidebarGroupLabel>

      {/* Menu skeletons */}
      <SidebarMenu>
        <SidebarMenuItem>
          <Skeleton className="h-8 w-full rounded-md" />
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Skeleton className="h-8 w-full rounded-md" />
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Skeleton className="h-8 w-full rounded-md" />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
