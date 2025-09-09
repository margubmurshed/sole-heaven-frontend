import { Badge, type VARIANT } from "@/components/custom/Badge";
import TableLoader from "@/components/custom/TableLoader";
import { ViewOrderModal } from "@/components/modules/User/Orders/ViewOrderModal";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useGetUserOrdersQuery } from "@/redux/features/order/order.api";
import { ORDER_STATUS } from "@/validations/order.validation";
import { useState } from "react";

type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isFetching } = useGetUserOrdersQuery({ page: currentPage, fields: "-updatedAt" });

    const getStatusVariant = (status: OrderStatus): VARIANT => {
        if (status === ORDER_STATUS.DELIVERED || status === ORDER_STATUS.CONFIRMED) return "success";
        if (status === ORDER_STATUS.FAILED) return "destructive";
        if (status === ORDER_STATUS.SHIPPED) return "secondary";
        return "default"
    }

    return (
        <div>
            <div className="w-full p-6 bg-background text-foreground">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Orders</h1>
                </div>
                {
                    isFetching ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableLoader columns={5} />
                            </TableBody>
                        </Table>
                    ) : data?.data.length ? (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.data?.map((order) => (
                                        <TableRow key={order._id}>
                                            <TableCell>{order._id}</TableCell>
                                            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusVariant(order.orderStatus)}>
                                                    {order.orderStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>৳{order.totalAmount} for {order.products.length} {order.products.length === 1 ? "item" : "items"}</TableCell>
                                            <TableCell>
                                                <ViewOrderModal orderID={order._id} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {
                                (data?.meta.totalPages || 1) > 1 && (
                                    <div className="mt-4 flex justify-end">
                                        <Pagination>
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        className={cn("select-none", {
                                                            "pointer-events-none opacity-50": currentPage === 1,
                                                            "cursor-pointer": currentPage > 1,
                                                        })}
                                                        onClick={() => setCurrentPage((prev) => (prev === 1 ? prev : prev - 1))}
                                                    />
                                                </PaginationItem>
                                                {Array.from({ length: data?.meta.totalPages || 1 }, (_, i) => i + 1).map((page) => (
                                                    <PaginationItem key={page} className="cursor-pointer">
                                                        <PaginationLink isActive={currentPage === page} onClick={() => setCurrentPage(page)}>
                                                            {page}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                ))}
                                                <PaginationItem>
                                                    <PaginationNext
                                                        className={cn("select-none cursor-pointer", {
                                                            "pointer-events-none opacity-50": currentPage === data?.meta.totalPages,
                                                        })}
                                                        onClick={() => setCurrentPage((prev) => (prev === data?.meta.totalPages ? prev : prev + 1))}
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </div>
                                )
                            }
                        </>
                    ) : (
                        <div>
                            <p className="text-center">No Orders Found</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Orders;
