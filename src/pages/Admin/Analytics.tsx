import ButtonLoader from "@/components/custom/ButtonLoader";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetStatsQuery } from "@/redux/features/stats/stats.api";
import { ShoppingCart, User } from "lucide-react";
import { FaMoneyCheck, FaSortAmountUp } from "react-icons/fa";

const DashboardIndex = () => {
    const { data, isLoading } = useGetStatsQuery();
    const stats = data?.data;
    if (isLoading) return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                <Skeleton className="h-36" />
                <Skeleton className="h-36" />
                <Skeleton className="h-36" />
                <Skeleton className="h-36" />
            </div>
        </div>
    )

    return (
        <div>
            {/* stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3" id="stats-cards">
                <div className="border rounded-md p-4 gap-2 bg-blue-500 text-white shadow-md flex items-center">
                    <span className="text-2xl"><User className="h-10 w-10" /></span>
                    <div className="flex flex-col">
                        <h3 className="font-semibold">Users</h3>
                        <p className="font-bold text-5xl">
                            {isLoading ? <ButtonLoader /> : stats?.thisWeek.users.count}
                        </p>
                        <p>Last 7 days</p>
                    </div>
                </div>
                <div className="border rounded-md p-4 gap-2 bg-red-500 text-white shadow-md flex items-center">
                    <span className="text-2xl"><ShoppingCart className="h-10 w-10" /></span>
                    <div className="flex flex-col">
                        <h3 className="font-semibold">Orders</h3>
                        <p className="font-bold text-5xl">
                            {isLoading ? <ButtonLoader /> : stats?.thisWeek.orders.count}
                        </p>
                        <p>Last 7 days</p>
                    </div>
                </div>
                <div className="border rounded-md p-4 gap-2 bg-purple-500 text-white shadow-md flex items-center">
                    <span className="text-2xl"><FaMoneyCheck className="h-10 w-10" /></span>
                    <div className="flex flex-col">
                        <h3 className="font-semibold">Revenue</h3>
                        <p className="font-bold text-5xl">
                            {isLoading ? <ButtonLoader /> : stats?.thisWeek.revenue}
                        </p>
                        <p>Last 7 days</p>
                    </div>
                </div>
                <div className="border rounded-md p-4 gap-2 bg-cyan-500 text-white shadow-md flex items-center">
                    <span className="text-2xl"><FaSortAmountUp className="h-10 w-10" /></span>
                    <div className="flex flex-col">
                        <h3 className="font-semibold">Products Sold</h3>
                        <p className="font-bold text-5xl">
                            {isLoading ? <ButtonLoader /> : stats?.thisWeek.productsSold}
                        </p>
                        <p>Last 7 days</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardIndex;